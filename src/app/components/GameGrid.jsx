"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GameCard from "./GameCard";

export default function GameGrid({
  initialGames,
  nextUrl,
  prevUrl,
  genres,
  activeGenre,
}) {
  const [games, setGames] = useState(initialGames);
  const [next, setNext] = useState(nextUrl);
  const [prev, setPrev] = useState(prevUrl);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(initialGames);

  // Genre click — push to URL, server re-fetches
  function handleGenre(slug) {
    if (slug) {
      router.push(`?genre=${slug}`);
    } else {
      router.push("?");
    }
  }

  // Next / Prev — client fetch directly since we already have the URL
  async function go(url) {
    if (!url) return;
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    setGames(data.results ?? []);
    setNext(data.next);
    setPrev(data.previous);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  useEffect(() => {
    setGames(initialGames);
    setNext(nextUrl);
    setPrev(prevUrl);
  }, [initialGames]);

  return (
    <div>
      {/* Genre bar */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        <button
          onClick={() => handleGenre("")}
          className={`flex-shrink-0 px-4 py-1.5 rounded-xl text-xs border transition-colors cursor-pointer
            ${
              activeGenre === ""
                ? "bg-white text-black border-white font-semibold"
                : "bg-transparent border-[#2a2a2a] text-[#aaa] hover:border-[#444] hover:text-white"
            }`}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenre(genre.slug)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-xl text-xs border transition-colors cursor-pointer
              ${
                activeGenre === genre.slug
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-transparent border-[#2a2a2a] text-[#aaa] hover:border-[#444] hover:text-white"
              }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {loading
          ? Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#111] animate-pulse"
                style={{ aspectRatio: "16/9" }}
              />
            ))
          : games.map((game) => <GameCard key={game.id} game={game} />)}
      </div>

      {/* Prev + Next */}
      <div className="flex justify-center items-center gap-3 mt-10">
        {prev && (
          <button
            onClick={() => go(prev)}
            disabled={loading}
            className="bg-transparent border border-[#2a2a2a] text-[#aaa] px-7 py-3 rounded-xl text-sm hover:border-[#444] hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
        )}
        {next && (
          <button
            onClick={() => go(next)}
            disabled={loading}
            className="bg-transparent border border-[#2a2a2a] text-[#aaa] px-7 py-3 rounded-xl text-sm hover:border-[#444] hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
