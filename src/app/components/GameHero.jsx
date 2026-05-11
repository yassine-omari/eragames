"use client";

import { useRouter } from "next/navigation";

export default function GameHero({ game }) {
  const router = useRouter();

  return (
    <div className="relative w-full h-[75vh] min-h-[500px] max-h-[700px] overflow-hidden ">
      {game.background_image ? (
        <img
          src={game.background_image}
          alt={game.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-[#111]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      <div className="relative h-full flex items-end px-6 md:px-10 pb-10">
        <div className="flex gap-6 items-end max-w-4xl w-full">
          <div className="flex-1 pb-1">
            {/* Genres */}
            {game.genres?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {game.genres.map((g) => (
                  <span
                    key={g.id}
                    className="text-[11px] font-medium text-gray-300 bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-full"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-3">
              {game.name}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-6 text-sm text-gray-400">
              <span className="text-amber-400 font-semibold">
                ⭐ {Number(game.rating).toFixed(1)}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span>{game.released?.slice(0, 4) ?? "—"}</span>
              {game.metacritic && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span
                    className={`font-semibold ${game.metacritic >= 80 ? "text-green-400" : game.metacritic >= 60 ? "text-yellow-400" : "text-red-400"}`}
                  >
                    Metacritic {game.metacritic}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
