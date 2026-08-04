import Link from "next/link";
import { BookOpen, Gamepad2, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Deck } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const swatch: Record<Deck["color"], string> = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  ink: "bg-foreground text-background",
};

export function DeckCard({ deck }: { deck: Deck }) {
  return (
    <Card className="group/deck transition-transform hover:-translate-y-1">
      <CardHeader>
        <span
          className={cn(
            "mb-1 flex size-10 items-center justify-center rounded-xl font-display text-sm font-semibold",
            swatch[deck.color],
          )}
          aria-hidden="true"
        >
          {deck.emojiFallback}
        </span>
        <CardTitle className="font-display text-lg">
          <Link href={`/decks/${deck.id}`} className="hover:underline">
            {deck.title}
          </Link>
        </CardTitle>
        <CardDescription className="leading-relaxed">
          {deck.description}
        </CardDescription>
        <CardAction>
          <Badge variant="outline">{deck.level}</Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Layers className="size-3.5" />
            {deck.words.length} words
          </span>
          <span>{deck.dueToday} due today</span>
        </div>
        <Progress
          value={deck.progress}
          className="[&_[data-slot=progress-track]]:h-2"
        />
        <p className="text-xs text-muted-foreground">
          {deck.progress}% mastered
        </p>
      </CardContent>

      <CardFooter className="gap-2 border-t">
        <Button
          size="sm"
          className="flex-1"
          render={<Link href={`/decks/${deck.id}/study`} />}
        >
          <BookOpen data-icon="inline-start" />
          Study
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          render={<Link href={`/decks/${deck.id}/game`} />}
        >
          <Gamepad2 data-icon="inline-start" />
          Play
        </Button>
      </CardFooter>
    </Card>
  );
}
