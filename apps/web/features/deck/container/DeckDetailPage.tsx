"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeckDetailHeader } from "../components/DeckDetailHeader";
import {
  fetchDeckById,
  selectCurrentDeck,
  selectFetchDeckError,
  selectFetchDeckLoading,
} from "../store/deck.slice";
import { WordList } from "@/features/card/components/WordList";
import {
  fetchCards,
  fetchMoreCards,
  selectCards,
  selectFetchCardsLoading,
  selectFetchMoreCardsLoading,
  selectHasMoreCards,
} from "@/features/card/store/card.slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";

export default function DeckDetailPage({ deckId }: { deckId: string }) {
  const dispatch = useAppDispatch();
  const deck = useAppSelector(selectCurrentDeck);
  const isDeckLoading = useAppSelector(selectFetchDeckLoading);
  const deckError = useAppSelector(selectFetchDeckError);
  const cards = useAppSelector(selectCards);
  const areCardsLoading = useAppSelector(selectFetchCardsLoading);
  const hasMoreCards = useAppSelector(selectHasMoreCards);
  const isLoadingMoreCards = useAppSelector(selectFetchMoreCardsLoading);

  useEffect(() => {
    dispatch(fetchDeckById(deckId));
    dispatch(fetchCards(deckId));
  }, [dispatch, deckId]);

  function handleLoadMore() {
    dispatch(fetchMoreCards(deckId));
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="flex flex-col gap-6">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit text-muted-foreground"
          render={<Link href="/decks" />}
        >
          <ChevronLeft data-icon="inline-start" />
          Back to decks
        </Button>

        {isDeckLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading deck...
          </div>
        ) : deckError || !deck ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <p className="text-sm text-destructive">
              {deckError ??
                "This deck doesn't exist or you don't have access to it."}
            </p>
            <Button variant="outline" size="sm" render={<Link href="/decks" />}>
              Back to decks
            </Button>
          </div>
        ) : (
          <>
            <DeckDetailHeader deck={deck} />

            {areCardsLoading ? (
              <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Loading words...
              </div>
            ) : (
              <WordList
                words={cards}
                hasMore={hasMoreCards}
                isLoadingMore={isLoadingMoreCards}
                onLoadMore={handleLoadMore}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
