import type { Metadata } from "next";
import DecksPage from "@/features/deck/container/DecksPage";

export const metadata: Metadata = {
  title: "My decks — Lexi",
  description: "Every vocabulary deck you have created, with mastery progress.",
};

export default function Decks() {
  return <DecksPage />;
}
