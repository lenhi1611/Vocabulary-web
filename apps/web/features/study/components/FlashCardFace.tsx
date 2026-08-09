import { ReactNode } from "react";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Shared shape for every layer of the flash card stack (the front/back
 * faces here, plus the decorative layers in FlashCard.tsx) — keeping this
 * in one place is what keeps the rounded corners pixel-identical across
 * all three cards.
 */
export const FLASH_CARD_RADIUS = "rounded-[32px]";

type FlashCardFaceProps = {
  topicLabel?: string | null;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  /** 180deg-rotated faces need `backface-visibility: hidden` to stay invisible while flipped away. */
  className?: string;
  /** True while this face is rotated away from the viewer — `backface-hidden` only hides it visually, so it also needs to drop out of hit-testing and tab order. */
  isHidden: boolean;
  children: ReactNode;
};

/** The chrome shared by both faces of the flash card: topic badge, favorite toggle, and a centered content area. */
export function FlashCardFace({
  topicLabel,
  isFavorited,
  onToggleFavorite,
  className,
  isHidden,
  children,
}: FlashCardFaceProps) {
  return (
    <div
      inert={isHidden}
      aria-hidden={isHidden}
      className={cn(
        FLASH_CARD_RADIUS,
        "absolute inset-0 flex h-full w-full flex-col bg-card shadow-[0_25px_60px_-28px_rgba(76,29,149,0.22)] backface-hidden",
        className,
      )}
    >
      <div className="flex items-center justify-between px-6 pt-6">
        {topicLabel ? (
          <Badge variant="secondary">{topicLabel.toUpperCase()}</Badge>
        ) : (
          <span />
        )}
        <button
          type="button"
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorited}
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Heart className={cn("size-5", isFavorited && "fill-destructive text-destructive")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-8 text-center">
        {children}
      </div>
    </div>
  );
}
