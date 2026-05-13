import { cookies } from "next/headers";

export async function GET() {
  (await cookies()).delete("session");
  return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
}
