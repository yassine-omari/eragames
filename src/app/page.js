import { cookies } from "next/headers";
import { verifySession } from "../../lib/session";
import { redirect } from "next/navigation";
import LandingPage from "./components/LandingPage";

export default async function Home() {
  const token = (await cookies()).get("session")?.value;

  if (!token) return <LandingPage />;

  try {
    await verifySession(token);
    redirect("/home");
  } catch {
    redirect("/login");
  }
}
