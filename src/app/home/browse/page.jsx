import {
  getPopularGames,
  getGamesByGenre,
  getGenres,
} from "../../../../lib/rawg";
import GameGrid from "@/app/components/GameGrid";

export default async function BrowsePage({ searchParams }) {
  const params = await searchParams;
  const selectedGenre = params?.genre ?? "";

  const [data, genresData] = await Promise.all([
    selectedGenre ? getGamesByGenre(selectedGenre) : getPopularGames(),
    getGenres(),
  ]);

  return (
    <div className="px-6 pt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-xl font-bold text-white tracking-tight">Browse</h1>
        <span className="text-[11px] px-3 py-0.5 rounded-full border border-[#1e1e1e] bg-[#111] text-[#555] font-mono">
          {data.count?.toLocaleString()} games
        </span>
      </div>

      <GameGrid
        initialGames={data.results ?? []}
        nextUrl={data.next}
        prevUrl={data.previous}
        genres={genresData.results ?? []}
        activeGenre={selectedGenre}
      />
    </div>
  );
}
