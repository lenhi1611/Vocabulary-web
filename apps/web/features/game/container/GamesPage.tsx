"use client";

import { fetchDecks, selectDecks } from "@/features/deck/store/deck.slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { Deck } from "@/shared/types";
import { useEffect, useState } from "react";
import { GAME_MODES } from "../constants";
import GameModeCard from "../components/GameModeCard";
import DeckRowItem from "../components/DeckRowItem";
import GameSelectModal from "../components/GameSelectModal";

export default function GamesPage() {
  const dispatch = useAppDispatch();
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  const decks = useAppSelector(selectDecks);

  useEffect(() => {
    dispatch(fetchDecks());
  }, [dispatch]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <h1 className="text-2xl font-medium mb-6">Games</h1>

      <section className="mb-8">
        <h2 className="text-sm font-medium text-gray-500 mb-3">Game modes</h2>
        <div className="grid grid-cols-2 gap-3">
          {GAME_MODES.map((mode) => (
            <GameModeCard key={mode.id} mode={mode} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-gray-500 mb-3">Your decks</h2>
        <div className="flex flex-col gap-2">
          {decks.map((deck) => (
            <DeckRowItem
              key={deck.id}
              deck={deck}
              onPlay={() => setSelectedDeck(deck)}
            />
          ))}
        </div>
      </section>

      {selectedDeck && (
        <GameSelectModal
          deck={selectedDeck}
          gameModes={GAME_MODES}
          onClose={() => setSelectedDeck(null)}
        />
      )}
    </div>
  );
}
