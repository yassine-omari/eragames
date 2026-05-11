import { searchGames } from "../../../../lib/rawg";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const data = await searchGames(query);
  return NextResponse.json(data);
}
