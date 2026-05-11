import React from "react";
import { getGameById } from "../../../../../lib/rawg";
import GameHero from "@/app/components/GameHero";
import { getGameScreenshots } from "../../../../../lib/rawg";
import GameScreenshots from "@/app/components/GameScreenshots";
import GameDescription from "@/app/components/GameDescription";

const page = async ({ params }) => {
  const { id } = await params;
  const [game, screenshotsData] = await Promise.all([
    getGameById(id),
    getGameScreenshots(id),
  ]);
  return (
    <div>
      <GameHero game={game} />
      <GameDescription description={game.description} />
      <GameScreenshots screenshots={screenshotsData.results} />
    </div>
  );
};

export default page;
