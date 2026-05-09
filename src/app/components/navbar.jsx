"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "./SearchModel";

const Navbar = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const name = user?.name;
  const avatar = user?.profile;
  const email = user?.email;

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : email?.[0].toUpperCase();

  const firstName = name ? name.split(" ")[0] : email?.split("@")[0];

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "GET" });
    window.location.href = "/login";
  };

  const NAV_LINKS = [
    { label: "Discover", href: "/home" },
    { label: "Library", href: "/home/library" },
    { label: "Community", href: "/home/community" },
    { label: "Releases", href: "/home/releases" },
  ];

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <nav className="flex justify-between items-center px-6 h-[80px] border-b border-[#1e1e1e] bg-[#0a0a0a] relative">
        {/* Logo */}
        <Link
          href="/"
          className="text-[20px] font-medium text-white tracking-tight"
        >
          Era<span className="text-[#6c63ff]">Games</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <Link
                href={link.href}
                className="text-[#666] text-[15px] px-3 py-1.5 rounded-lg hover:text-[#ccc] hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          {/* Search */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchOpen(true)}
            className="w-8 h-8 flex items-center justify-center bg-[#111] border border-[#222] rounded-lg text-[#555] hover:border-[#444] hover:text-[#aaa] transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-8 h-8 flex items-center justify-center bg-[#111] border border-[#222] rounded-lg text-[#555] hover:border-[#444] hover:text-[#aaa] transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#6c63ff] rounded-full border border-[#0a0a0a]"
            />
          </motion.button>

          {/* Avatar dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 bg-[#111] border border-[#222] rounded-[10px] pl-1 pr-2.5 py-1 hover:border-[#444] transition-colors cursor-pointer"
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#6c63ff] flex items-center justify-center text-white text-[11px] font-medium">
                  {initials}
                </div>
              )}
              <span className="text-[12px] text-[#aaa]">{firstName}</span>
              <motion.svg
                animate={{ rotate: menuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-3 h-3 text-[#555]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.button>

            <AnimatePresence>
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-52 bg-[#111] border border-[#222] rounded-2xl overflow-hidden z-50"
                  >
                    {/* Header */}
                    <div className="px-3.5 py-3 border-b border-[#1e1e1e] bg-white/[0.02]">
                      <p className="text-[10px] text-[#444] uppercase tracking-wider mb-1">
                        Signed in as
                      </p>
                      <p className="text-[13px] text-[#ccc] font-medium truncate">
                        {email}
                      </p>
                    </div>

                    {/* Items */}
                    {[
                      {
                        href: "/home/profile",
                        label: "My profile",
                        icon: (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        ),
                      },
                      {
                        href: "/home/settings",
                        label: "Settings",
                        icon: (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        ),
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-[#999] hover:bg-white/5 hover:text-[#ddd] transition-colors"
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}

                    <div className="h-px bg-[#1e1e1e]" />

                    <motion.button
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSignOut}
                      className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[13px] text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign out
                    </motion.button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
