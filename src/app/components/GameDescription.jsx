"use client";

import { useState } from "react";

export default function GameDescription({ description }) {
  const [expanded, setExpanded] = useState(false);

  if (!description) return null;

  return (
    <div className="px-6 md:px-10 py-10 max-w-4xl">
      <h2 className="text-white text-lg font-bold mb-4 tracking-tight">
        About
      </h2>

      <div
        className={`relative overflow-hidden transition-all duration-500 ${expanded ? "max-h-[2000px]" : "max-h-[96px]"}`}
      >
        {/* RAWG description comes as HTML — renders paragraphs, lists, links properly */}
        <div
          className="text-[#888] text-sm leading-relaxed prose prose-invert prose-sm max-w-none
            [&_a]:text-white [&_a]:underline [&_a]:underline-offset-2
            [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-4 [&_h3]:text-white [&_h3]:font-semibold"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Fade out when collapsed */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
        )}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-xs text-[#aaa] hover:text-white transition-colors cursor-pointer"
      >
        {expanded ? "Show less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}
