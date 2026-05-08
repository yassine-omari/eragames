import { hash } from "bcrypt";
import { prisma } from "../../../../../lib/prisma";
import { createSession } from "../../../../../lib/session";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return Response.json({ error: "User exists" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = await createSession(user.id);

    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
