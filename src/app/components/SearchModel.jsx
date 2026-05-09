"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const SearchModal = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  // Auto focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Search as user types
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300); // wait 300ms after user stops typing

    return () => clearTimeout(timeout);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#111] border border-[#222] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1e1e]">
          <svg
            className="w-4 h-4 text-[#555] shrink-0"
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
          <input
            ref={inputRef}
            type="text"
            placeholder="Search games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[#e0e0e0] text-sm placeholder-[#444] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#555] hover:text-[#aaa] transition-colors text-xs"
            >
              Clear
            </button>
          )}
          <kbd className="text-[10px] text-[#444] border border-[#2a2a2a] rounded px-1.5 py-0.5">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="px-4 py-6 text-center text-sm text-[#555]">
              Searching...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-[#555]">
              No results for "{query}"
            </div>
          )}

          {!loading &&
            results.map((game) => (
              <button
                key={game.id}
                onClick={() => {
                  router.push(`/home/game/${game.id}`);
                  onClose();
                }}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/5 transition-colors text-left"
              >
                {game.image && (
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                )}
                <div>
                  <p className="text-sm text-[#ddd] font-medium">
                    {game.title}
                  </p>
                  <p className="text-xs text-[#555]">{game.genre}</p>
                </div>
              </button>
            ))}

          {!query && (
            <div className="px-4 py-6 text-center text-sm text-[#555]">
              Start typing to search games
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
