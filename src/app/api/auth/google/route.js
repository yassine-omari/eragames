export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: "https://eragames-seven.vercel.app/api/auth/callback/google",
    response_type: "code",
    scope: "openid email profile",
  });
  return Response.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
  );
}
