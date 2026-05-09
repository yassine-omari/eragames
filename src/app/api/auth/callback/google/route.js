import { prisma } from "../../../../../../lib/prisma";
import { createSession } from "../../../../../../lib/session";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) return Response.redirect("http://localhost:3000/login");

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "http://localhost:3000/api/auth/callback/google",
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
        data: { name, profile: picture }, // ← always keep info fresh
      });
    }

    // Step 4 — create session and redirect to home
    const token = await createSession(user.id);

    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return Response.redirect("http://localhost:3000/home");
  } catch (err) {
    console.error(err);
    return Response.redirect("http://localhost:3000/login");
  }
}
