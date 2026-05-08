import { NextResponse } from "next/server";
import { verifySession } from "./lib/session";

const protectedRoutes = ["/home"];

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);
  if (!isProtected) return NextResponse.next();
  const token = req.cookies.get("session")?.value;
  if (!token) {
    return NextResponse.redirect(nextUrl("/login", req.url));
  }
  try {
    await verifySession(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(nextUrl("/login", req.url));
  }
}
export const config = {
  matcher: ["/home"],
};
