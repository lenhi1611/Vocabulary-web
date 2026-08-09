import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Card as CardType } from "@/shared/types";
import { FLASH_CARD_RADIUS, FlashCardFace } from "./FlashCardFace";
import { FlashCardWordBlock } from "./FlashCardWordBlock";

/**
 * The illusion of a stack of physical cards: two rotated lavender layers
 * peeking out from behind the front card, rather than a drop shadow. Each
 * shares FLASH_CARD_RADIUS so every layer's corners line up exactly.
 */
const STACK_LAYERS = [
  { rotate: "-rotate-6", offset: "-translate-x-7 translate-y-8", tone: "bg-violet-300" },
  { rotate: "rotate-5", offset: "translate-x-6 -translate-y-7", tone: "bg-violet-200" },
] as const;

type FlashCardProps = {
  card: CardType;
  topicLabel?: string | null;
  isRevealed: boolean;
  onToggleReveal: () => void;
};

/**
 * The parent must render this with `key={card.id}` — remounting per card is
 * what resets local-only state (the favorite toggle) when the card changes,
 * rather than syncing it with an effect.
 */
export function FlashCard({ card, topicLabel, isRevealed, onToggleReveal }: FlashCardProps) {
  // Bookmarking is local-only UI state for now — there's no "favorite" field
  // on Card yet, so it intentionally doesn't persist across cards/sessions.
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="relative w-full max-w-xl">
      {STACK_LAYERS.map((layer, layerIndex) => (
        <div
          key={layerIndex}
          aria-hidden
          className={cn(
            FLASH_CARD_RADIUS,
            "absolute inset-0 -z-10",
            layer.rotate,
            layer.offset,
            layer.tone,
          )}
        />
      ))}

      <div className="perspective-[1500px]">
        <div
          role="button"
          tabIndex={0}
          aria-label={isRevealed ? "Hide the meaning" : "Reveal the meaning"}
          onClick={onToggleReveal}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onToggleReveal();
            }
          }}
          className={cn(
            "relative h-104 w-full cursor-pointer transition-transform duration-500 ease-out transform-3d",
            isRevealed && "transform-[rotateY(180deg)]",
          )}
        >
          <FlashCardFace
            topicLabel={topicLabel}
            isFavorited={isFavorited}
            onToggleFavorite={() => setIsFavorited((current) => !current)}
            isHidden={isRevealed}
          >
            <FlashCardWordBlock card={card} />
            <p className="text-xs text-muted-foreground">
              Tap the card to reveal the meaning
            </p>
          </FlashCardFace>

          <FlashCardFace
            topicLabel={topicLabel}
            isFavorited={isFavorited}
            onToggleFavorite={() => setIsFavorited((current) => !current)}
            isHidden={!isRevealed}
            className="transform-[rotateY(180deg)]"
          >
            <FlashCardWordBlock card={card} />
            <div className="h-px w-full bg-border" />
            <div className="flex flex-col gap-3">
              <p className="text-lg leading-relaxed font-semibold">
                {card.meaning}
              </p>
              {card.example ? (
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;{card.example}&rdquo;
                </p>
              ) : null}
            </div>
          </FlashCardFace>
        </div>
      </div>
    </div>
  );
}
