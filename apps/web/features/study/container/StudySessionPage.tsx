"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import {
  fetchDeckById,
  selectCurrentDeck,
  selectFetchDeckError,
  selectFetchDeckLoading,
} from "@/features/deck/store/deck.slice";
import {
  fetchCards,
  fetchMoreCards,
  selectCards,
  selectFetchCardsLoading,
  selectFetchMoreCardsLoading,
  selectHasMoreCards,
} from "@/features/card/store/card.slice";
import { useStudySession } from "@/features/study/hooks/useStudySession";
import { StudyHeader } from "@/features/study/components/StudyHeader";
import { FlashCard } from "@/features/study/components/FlashCard";
import { RatingButtons } from "@/features/study/components/RatingButtons";
import { StudyNavArrow } from "@/features/study/components/StudyNavArrow";
import { SessionStatsPanel } from "@/features/study/components/SessionStatsPanel";
import { StudyComplete } from "@/features/study/components/StudyComplete";
import { fetchSessionStats, fetchStudyCards, selectFetchStudyCardsLoading, selectSessionStats, selectStudyCards } from "../store/study.slice";

export function StudySessionPage({ deckId }: { deckId: string }) {
  const dispatch = useAppDispatch();

  const deck = useAppSelector(selectCurrentDeck);
  const isDeckLoading = useAppSelector(selectFetchDeckLoading);
  const deckError = useAppSelector(selectFetchDeckError);

  const cards = useAppSelector(selectStudyCards);
  const isFetchingCards = useAppSelector(selectFetchStudyCardsLoading);

  const backendStats = useAppSelector(selectSessionStats)

  useEffect(() => {
    dispatch(fetchDeckById(deckId));
    dispatch(fetchStudyCards(deckId));
  }, [dispatch, deckId]);

  // A study session needs the whole deck, not just the first page — keep
  // paging through card.slice's cursor until nothing is left to fetch.
  // useEffect(() => {
  //   if (!isFetchingCards && !isFetchingMoreCards && hasMoreCards) {
  //     dispatch(fetchMoreCards(deckId));
  //   }
  // }, [dispatch, deckId, isFetchingCards, isFetchingMoreCards, hasMoreCards]);

  // const isPreparingCards = isFetchingCards || isFetchingMoreCards || hasMoreCards;

  const session = useStudySession(cards);

  useEffect(()=> {
    if(session.isComplete){
      dispatch(fetchSessionStats(deckId))
    }
  }, [dispatch, deckId, session.isComplete])


  if (isDeckLoading || isFetchingCards) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Preparing your study session...
      </div>
    );
  }

  if (deckError || !deck || !deck) {
    return (
      <div className="flex flex-col items-center gap-2 py-24 text-center">
        <p className="text-sm text-destructive">
          {deckError ?? "This deck doesn't exist or you don't have access to it."}
        </p>
        <Button variant="outline" size="sm" render={<Link href="/decks" />}>
          Back to decks
        </Button>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <Empty className="rounded-xl bg-secondary/50">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Plus />
          </EmptyMedia>
          <EmptyTitle className="font-display">Nothing to study yet</EmptyTitle>
          <EmptyDescription>
            Add a few words to &quot;{deck.name}&quot; before starting a session.
          </EmptyDescription>
        </EmptyHeader>
        <Button className="mt-2" render={<Link href={`/decks/${deckId}/add-word`} />}>
          <Plus data-icon="inline-start" />
          Add word
        </Button>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <StudyHeader
        deckId={deckId}
        deckName={deck.name}
        current={Math.min(session.index + 1, session.total)}
        total={session.total}
      />

      {session.isComplete ? (
        <StudyComplete
          deckId={deckId}
          stats={backendStats ?? session.stats}
          onRestart={session.restart}
        />
      ) : (
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
          <div className="flex w-full max-w-2xl items-center justify-center gap-3 sm:gap-5">
            <StudyNavArrow
              direction="prev"
              onClick={session.goToPrevious}
              disabled={session.isFirst}
            />

            <div className="flex flex-1 flex-col items-center gap-5">
              {session.currentCard ? (
                <FlashCard
                  key={session.currentCard.id}
                  card={session.currentCard}
                  topicLabel={deck.topic}
                  isRevealed={session.isRevealed}
                  onToggleReveal={session.toggleReveal}
                />
              ) : null}

              {session.isRevealed ? (
                <>
                  <p className="text-sm font-medium text-muted-foreground">
                    How well did you remember this word?
                  </p>
                  <RatingButtons onRate={session.rate} />
                </>
              ) : (
                <Button size="lg" onClick={session.toggleReveal}>
                  Show answer
                </Button>
              )}
            </div>

            <StudyNavArrow
              direction="next"
              onClick={session.goToNext}
              disabled={session.isLast}
            />
          </div>

          <SessionStatsPanel stats={session.stats} />
        </div>
      )}
    </div>
  );
}
