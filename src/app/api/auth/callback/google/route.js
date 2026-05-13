import { prisma } from "../../../../../../lib/prisma";
import { createSession } from "../../../../../../lib/session";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(req) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) return Response.redirect(`${BASE_URL}/login`);

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${BASE_URL}/api/auth/callback/google`,
        grant_type: "authorization_code",
      }),
    });
    const { access_token } = await tokenRes.json();

    const userRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );
    const data = await userRes.json();
    const { email, name, picture } = data;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: { email, name, password: "", profile: picture },
      });
    } else {
      user = await prisma.user.update({
        where: { email },
        data: { name, profile: picture },
      });
    }

    const token = await createSession(user.id);

    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.redirect(`${BASE_URL}/home`);
  } catch (err) {
    console.error(err);
    return Response.redirect(`${BASE_URL}/login`);
  }
}
