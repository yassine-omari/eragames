import { prisma } from "../../../../../../lib/prisma";
import { createSession } from "../../../../../../lib/session";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET(req) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) return Response.redirect(`${BASE_URL}/login`);

    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          code,
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          redirect_uri: `${BASE_URL}/api/auth/callback/github`,
        }),
      },
    );
    const { access_token } = await tokenRes.json();

    const userRes = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await userRes.json();
    const { name, avatar_url } = data;

    const emailRes = await fetch("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const emails = await emailRes.json();
    const email = emails.find((e) => e.primary)?.email;

    if (!email) return Response.redirect(`${BASE_URL}/login`);

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: { email, name, password: "", profile: avatar_url },
      });
    } else {
      user = await prisma.user.update({
        where: { email },
        data: { name, profile: avatar_url },
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
