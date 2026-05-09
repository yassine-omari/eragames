import Navbar from "../components/navbar";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { cookies } from "next/headers";
import LandingPage from "../components/LandingPage";
import { verifySession } from "../../../lib/session";

export default async function Layout({ children }) {
  const token = (await cookies()).get("session")?.value;

  if (!token) return <LandingPage />;

  const { userId } = await verifySession(token);
  const user = await prisma.user.findUnique({ where: { id: userId } });

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] px-6">
      <Navbar user={user} />
      {children}
    </div>
  );
}
