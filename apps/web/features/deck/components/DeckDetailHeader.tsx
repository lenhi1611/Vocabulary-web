import Link from "next/link";
import { BookOpen, Gamepad2, Layers, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Deck } from "@/shared/types";

function formatLevel(level: Deck["level"]) {
  return level.charAt(0) + level.slice(1).toLowerCase();
}

export function DeckDetailHeader({ deck }: { deck: Deck }) {
  const cardCount = deck._count?.cards ?? 0;

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{formatLevel(deck.level)}</Badge>
          <Badge variant="outline">
            <Layers data-icon="inline-start" />
            {cardCount} {cardCount === 1 ? "word" : "words"}
          </Badge>
          {deck.topic ? <Badge variant="outline">{deck.topic}</Badge> : null}
        </div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-balance">
          {deck.name}
        </h1>
        {deck.description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {deck.description}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="lg"
          variant="outline"
          className="h-10"
          render={<Link href={`/decks/${deck.id}/add-word`} />}
        >
          <Plus data-icon="inline-start" />
          Add word
        </Button>
        <Button
          size="lg"
          className="h-10"
          render={<Link href={`/decks/${deck.id}/study`} />}
        >
          <BookOpen data-icon="inline-start" />
          Study deck
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-10"
          render={<Link href={`/decks/${deck.id}/game`} />}
        >
          <Gamepad2 data-icon="inline-start" />
          Play game
        </Button>
      </div>
    </div>
  );
}
