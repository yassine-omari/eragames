"use client";

import { useState } from "react";

export default function GameScreenshots({ screenshots }) {
  const [selected, setSelected] = useState(null);

  if (!screenshots?.length) return null;

  return (
    <div className="py-10">
      <h2 className="text-white text-lg font-bold mb-4 tracking-tight px-6 md:px-10">
        Screenshots
      </h2>

      {/* Horizontal scroll row */}
      <div className="flex gap-3 overflow-x-auto px-6 md:px-10 pb-3 scrollbar-hide">
        {screenshots.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelected(s.image)}
            className="flex-shrink-0 w-72 rounded-xl overflow-hidden cursor-pointer hover:ring-1 hover:ring-white/20 transition-all"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src={s.image}
              alt="screenshot"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4"
        >
          <img
            src={selected}
            alt="screenshot"
            className="max-w-5xl w-full rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
