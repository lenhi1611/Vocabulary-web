import Image from "next/image";

interface BoyIllustrationProps {
  src?: string;
}

// Rendered below the word cards (z-5 < WordCard's z-10) so the cards sit
// on top of him. Expects a transparent-background cutout — no cards
// baked into the artwork, since those are rendered separately as
// <WordCard> components.
export function BoyIllustration({ src = "/images/hero-flashcards-1.png" }: BoyIllustrationProps) {
  return (
    <div className="absolute left-1/2 top-1/2 z-5 w-[90%] -translate-x-1/2 -translate-y-1/2">
      <Image
        src={src}
        alt="Illustration of a smiling boy holding a flashcard that says hello"
        width={716}
        height={974}
        priority
        // Next's built-in PNG optimizer quantizes to a palette and drops
        // this image's alpha channel entirely (verified: source has real
        // transparency, the /_next/image output doesn't) — skip it so the
        // transparent cutout renders as-is.
        unoptimized
        className="h-auto w-full drop-shadow-xl"
      />
    </div>
  );
}
