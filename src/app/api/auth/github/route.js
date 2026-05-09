export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: "http://localhost:3000/api/auth/callback/github",
    scope: "read:user user:email", 
  });
  return Response.redirect(
    `https://github.com/login/oauth/authorize?${params}`,
  );
}
