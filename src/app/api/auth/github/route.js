export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: "https://eragames-seven.vercel.app/api/auth/callback/github",
    scope: "read:user user:email",
  });
  return Response.redirect(
    `https://github.com/login/oauth/authorize?${params}`,
  );
}
