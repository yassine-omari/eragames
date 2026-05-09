"use client";

import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans px-6">
      {/* Navbar */}

      <nav className="flex justify-between items-center py-5 border-b border-[#1e1e1e]">
        <div className="text-lg font-medium text-white tracking-tight">
          Era<span className="text-[#6c63ff]">Games</span>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={() => router.push("/login")}
            className="bg-transparent border border-[#2a2a2a] text-[#aaa] px-4 py-2 rounded-xl text-sm hover:border-[#444] hover:text-white transition-colors cursor-pointer"
          >
            Log in
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-white text-[#0a0a0a] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#e8e8e8] transition-colors cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center py-20 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#111] border border-[#222] text-[#888] text-xs px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6c63ff]" />
          Now in early access
        </div>
        <h1 className="text-5xl font-medium text-white leading-tight tracking-tight mb-4">
          Your next game <br />
          starts <span className="text-[#6c63ff]">here</span>
        </h1>
        <p className="text-[#555] text-base leading-relaxed mb-8">
          Discover, track, and connect with the games you love. <br />
          All in one place built for real gamers.
        </p>
        <div className="flex gap-2.5 justify-center flex-wrap">
          <button
            onClick={() => router.push("/signup")}
            className="bg-white text-[#0a0a0a] px-7 py-3 rounded-xl text-sm font-medium hover:bg-[#e8e8e8] transition-colors cursor-pointer"
          >
            Get started for free
          </button>
          <button className="bg-transparent border border-[#2a2a2a] text-[#aaa] px-7 py-3 rounded-xl text-sm hover:border-[#444] hover:text-white transition-colors cursor-pointer">
            Browse games
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pb-16">
        {[
          {
            icon: "🎮",
            title: "Game library",
            desc: "Track everything you're playing, finished, or want to try.",
          },
          {
            icon: "👥",
            title: "Community",
            desc: "Connect with other gamers and share your experience.",
          },
          {
            icon: "📊",
            title: "Stats & progress",
            desc: "See your gaming habits and milestones over time.",
          },
          {
            icon: "🔔",
            title: "Release alerts",
            desc: "Never miss a launch from your favorite studios.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-3 text-base">
              {f.icon}
            </div>
            <h3 className="text-sm font-medium text-[#ddd] mb-1.5">
              {f.title}
            </h3>
            <p className="text-xs text-[#555] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
