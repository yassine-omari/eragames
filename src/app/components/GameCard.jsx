import Link from "next/link";

export default function GameCard({ game }) {
  return (
    <Link href={`/home/game/${game.id}`}>
      <div
        key={game.id}
        className="rounded-2xl overflow-hidden bg-[#111] border border-[#1e1e1e] hover:border-[#2a2a2a] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      >
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          <img
            src={game.background_image}
            alt={game.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-3">
          <p className="text-white text-sm font-semibold truncate">
            {game.name}
          </p>
          <p className="text-[#555] text-xs mt-1">
            {game.released?.slice(0, 4)}
          </p>
          <p className="text-yellow-400 text-xs mt-1">★ {game.rating}</p>
        </div>
      </div>
    </Link>
  );
}
