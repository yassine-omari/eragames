import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Called after login/register to create the token
export async function createSession(userId) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d") // token expires in 7 days
    .sign(secret);

  return token;
}

// Called on protected routes to check who's logged in
export async function verifySession(token) {
  const { payload } = await jwtVerify(token, secret);
  return payload; // contains { userId, exp, ... }
}
