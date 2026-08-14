"use client";

import { useCallback, useMemo, useState } from "react";
import { REMEMBERED_RATINGS, StudyRating } from "@/features/study/constants";
import type { Card } from "@/shared/types";
import { useAppDispatch } from "@/shared/store/hooks";
import { submitReview } from "../store/study.slice";

export type StudySessionStats = {
  reviewed: number;
  remembered: number;
  needsWork: number;
  accuracy: number;
};

/**
 * Drives a single study pass over `cards`: which card is current, whether
 * its answer is revealed, and the ratings collected so far. Ratings are
 * keyed by card id (not accumulated as a running counter) so re-rating a
 * card after navigating back never double-counts it in the stats.
 */
export function useStudySession(cards: Card[]) {
  const dispatch = useAppDispatch()
  const [index, setIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [ratings, setRatings] = useState<Record<string, StudyRating>>({});

  const total = cards.length;
  const isComplete = total > 0 && index >= total;
  const currentCard = isComplete ? null : (cards[index] ?? null);

  const toggleReveal = useCallback(() => setIsRevealed((current) => !current), []);

  const rate = useCallback(
    (rating: StudyRating) => {
      if (!currentCard) return;
      setRatings((prev) => ({ ...prev, [currentCard.id]: rating }));
      setIsRevealed(false);
      setIndex((current) => current + 1);

      dispatch(submitReview({cardId: currentCard.id, rating: rating}))
    },
    [currentCard],
  );

  const goToPrevious = useCallback(() => {
    setIsRevealed(false);
    setIndex((current) => Math.max(0, current - 1));
  }, []);

  const goToNext = useCallback(() => {
    setIsRevealed(false);
    // Browsing with the arrows only steps through existing cards — it never
    // advances past the last one into the "session complete" state; only
    // rating a card can do that.
    setIndex((current) => Math.min(Math.max(total - 1, 0), current + 1));
  }, [total]);

  const restart = useCallback(() => {
    setIndex(0);
    setIsRevealed(false);
    setRatings({});
  }, []);

  const stats = useMemo<StudySessionStats>(() => {
    const values = Object.values(ratings);
    const reviewed = values.length;
    const remembered = values.filter((rating) =>
      REMEMBERED_RATINGS.includes(rating),
    ).length;
    const needsWork = reviewed - remembered;
    const accuracy = reviewed === 0 ? 0 : Math.round((remembered / reviewed) * 100);
    return { reviewed, remembered, needsWork, accuracy };
  }, [ratings]);

  return {
    total,
    index,
    currentCard,
    isRevealed,
    isComplete,
    isFirst: index === 0,
    isLast: total === 0 || index >= total - 1,
    stats,
    toggleReveal,
    rate,
    goToPrevious,
    goToNext,
    restart,
  };
}
