import Link from "next/link";
import { Loader2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StudySessionStats } from "@/features/study/hooks/useStudySession";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { resetDeck, selectResetLoading } from "../store/study.slice";

type StudyCompleteProps = {
  deckId: string;
  stats: StudySessionStats;
  onRestart: () => void;
};

export function StudyComplete({
  deckId,
  stats,
  onRestart,
}: StudyCompleteProps) {
  const dispatch = useAppDispatch();
  const isResetLodaing = useAppSelector(selectResetLoading);

  async function handleReset() {
    await dispatch(resetDeck(deckId));
    onRestart(); // reset local session state
  }
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <PartyPopper className="size-5" />
      </span>
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        Session complete!
      </h2>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
        You reviewed {stats.reviewed} {stats.reviewed === 1 ? "word" : "words"}{" "}
        with {stats.accuracy}% accuracy.
      </p>
      <div className="mt-3 flex gap-2">
        <Button variant="outline" render={<Link href={`/decks/${deckId}`} />}>
          Back to deck
        </Button>
        <Button onClick={onRestart}>Study again</Button>
        <Button
          variant={"destructive"}
          onClick={handleReset}
          disabled={isResetLodaing}
        >
          {isResetLodaing ? <Loader2 className="size-4 animate-spin" /> : null}
          start over
        </Button>
      </div>
    </div>
  );
}
