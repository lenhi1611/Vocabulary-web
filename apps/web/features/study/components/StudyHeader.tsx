import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type StudyHeaderProps = {
  deckId: string;
  deckName: string;
  current: number;
  total: number;
};

export function StudyHeader({ deckId, deckName, current, total }: StudyHeaderProps) {
  const progressValue = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          render={<Link href={`/decks/${deckId}`} />}
        >
          <ChevronLeft />
          <span className="sr-only">Back to deck</span>
        </Button>
        <div>
          <h1 className="font-display text-xl font-semibold tracking-tight">
            Flashcard Session
          </h1>
          <p className="text-sm text-muted-foreground">
            {deckName} · {total} {total === 1 ? "word" : "words"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:w-64">
        <Progress value={progressValue} className="flex-1" />
        <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
          {Math.min(current, total)} / {total}
        </span>
      </div>
    </div>
  );
}
