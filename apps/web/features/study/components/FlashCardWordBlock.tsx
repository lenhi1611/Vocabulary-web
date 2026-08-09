import { SpeakButton } from "@/shared/components/audio/SpeakButton";
import type { Card as CardType } from "@/shared/types";

/** Word + phonetic + pronounce button — identical on both faces of the flash card. */
export function FlashCardWordBlock({ card }: { card: CardType }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <h2 className="font-display text-4xl font-bold wrap-break-word">
        {card.word}
      </h2>
      {card.phonetic ? <p className="text-lg text-primary">{card.phonetic}</p> : null}
      <SpeakButton text={card.word} variant="filled" size="icon-lg" className="mt-2" />
    </div>
  );
}
