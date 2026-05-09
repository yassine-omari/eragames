"use client";
export const dynamic = "force-dynamic";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const FEATURES = [
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
];

const Page = () => {
  const router = useRouter();

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans px-6">
      <div className="text-center pt-24 pb-10  mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-[#111] border border-[#222] text-[#888] text-xs px-3 py-1.5 rounded-full mb-6"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-[#6c63ff]"
          />
          Now in early access
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl font-medium text-white leading-tight tracking-tight mb-4"
        >
          Your next game <br />
          starts <span className="text-[#6c63ff]">here</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#555] text-base leading-relaxed mb-8"
        >
          Discover, track, and connect with the games you love. <br />
          All in one place built for real gamers.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-transparent border border-[#2a2a2a] text-[#aaa] px-7 py-3 rounded-xl text-sm hover:border-[#444] hover:text-white transition-colors cursor-pointer"
          >
            Browse games
          </motion.button>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto pb-16">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              whileHover={{
                scale: 1.04,
                borderColor: "#6c63ff55",
                transition: { duration: 0.15 },
              }}
              className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 text-left cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.15 }}
                className="w-9 h-9 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-3 text-base"
              >
                {f.icon}
              </motion.div>
              <h3 className="text-sm font-medium text-[#ddd] mb-1.5">
                {f.title}
              </h3>
              <p className="text-xs text-[#555] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
