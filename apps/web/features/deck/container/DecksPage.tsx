"use client";

import { useEffect } from "react";
import { Layers, Loader2, Sparkles } from "lucide-react";
import { CreateDeckDialog } from "../components/CreateDeckDialog";
import { DeckCard } from "../components/DeckCard";
import { fetchDecks, selectDecks, selectFetchDecksError, selectFetchDecksLoading } from "../store/deck.slice";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";

export default function DecksPage() {
  const dispatch = useAppDispatch();
  const decks = useAppSelector(selectDecks);
  const isLoading = useAppSelector(selectFetchDecksLoading);
  const error = useAppSelector(selectFetchDecksError);

  useEffect(() => {
    dispatch(fetchDecks());
  }, [dispatch]);

  const totalCards = decks.reduce((total, deck) => total + (deck._count?.cards ?? 0), 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              My decks
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {decks.length} decks · {totalCards} words
            </p>
          </div>
          <CreateDeckDialog />
        </div>

        <Card className="border-dashed bg-secondary/40">
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Sparkles className="size-5" />
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="font-display font-semibold">Tip: keep decks small</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Decks of 20 to 40 words are the easiest to finish in one sitting, which
                keeps your streak safe.
              </p>
            </div>
          </CardContent>
        </Card>

        <section className="flex flex-col gap-4">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
            <Layers className="size-5" />
            All decks
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading decks...
            </div>
          ) : error ? (
            <p className="py-16 text-center text-sm text-destructive">{error}</p>
          ) : decks.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              You don&apos;t have any decks yet. Create your first one to get started.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {decks.map((deck) => (
                <DeckCard key={deck.id} deck={deck} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
