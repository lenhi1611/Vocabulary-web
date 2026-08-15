'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Deck } from '@/shared/types';
import { ChevronRight } from 'lucide-react';

interface Props {
  deck: Deck;
  onPlay: () => void;
}

export default function DeckRowItem({ deck, onPlay }: Props) {
  const wordCount = deck._count?.cards ?? 0;
  const tooFew = wordCount < 4;

  const row = (
    <div
      onClick={tooFew ? undefined : onPlay}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl border transition-all
        ${tooFew
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:border-[#1D9E75] hover:bg-[#E1F5EE] cursor-pointer'}
      `}
    >
      <div className="w-2 h-2 rounded-full bg-[#1D9E75] flex-shrink-0" />
      <p className="text-sm font-medium flex-1 truncate text-left ">{deck.name}</p>
      <span className="text-xs text-muted-foreground flex-shrink-0">
        {wordCount} words
      </span>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </div>
  );

  if (tooFew) {
    return (
      <Tooltip>
        <TooltipTrigger >{row}</TooltipTrigger>
        <TooltipContent>Need at least 4 words to play</TooltipContent>
      </Tooltip>
    );
  }

  return row;
}