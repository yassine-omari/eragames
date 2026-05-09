import { cookies } from "next/headers";

export async function GET() {
  (await cookies()).delete("session");
  return Response.redirect("http://localhost:3000/login");
}
