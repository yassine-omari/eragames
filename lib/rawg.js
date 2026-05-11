export async function getPopularGames() {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`,
    { cache: "no-store" },
  );
  return res.json();
}
export async function getGenres() {
  const res = await fetch(
    `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`,
    { cache: "no-store" },
  );

  return res.json();
}
export async function getGamesByGenre(genre) {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&genres=${genre}&page_size=20`,
    { cache: "no-store" },
  );
  return res.json();
}
export async function getGameById(id) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`,
    { cache: "no-store" },
  );

  return res.json();
}
export async function getGameScreenshots(id) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.RAWG_API_KEY}`,
    { cache: "no-store" },
  );
  return res.json();
}
export async function searchGames(query) {
  const res = await fetch(
    `https://api.rawg.io/api/games?search=${encodeURIComponent(query)}&key=${process.env.RAWG_API_KEY}`,
    { cache: "no-store" },
  );

  return res.json();
}
