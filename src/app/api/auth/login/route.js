import { prisma } from "../../../../../lib/prisma";
import { compare } from "bcrypt";
import { createSession } from "../../../../../lib/session";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return Response.json({ error: "User not found" }, { status: 404 });
    const valid = await compare(password, user.password);
    if (!valid)
      return Response.json({ error: "Wrong password" }, { status: 401 });
    const token = await createSession(user.id);

    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
