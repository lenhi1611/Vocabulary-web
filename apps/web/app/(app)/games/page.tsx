import GamesPage from "@/features/game/container/GamesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games — Lexi",
  description: "Play game to study your words",
};

export default function Games() {
  return <GamesPage/>;
}
