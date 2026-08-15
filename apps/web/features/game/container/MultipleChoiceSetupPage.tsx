// app/(dashboard)/games/multiple-choice/[deckId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Layers } from 'lucide-react';
import { Deck } from '@/shared/types';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { fetchDeckById, selectCurrentDeck } from '@/features/deck/store/deck.slice';

const QUESTION_COUNT_OPTIONS = [5, 10, 20] as const;
type Direction = 'en-vi' | 'vi-en';

export default function MultipleChoiceSetupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { deckId } = useParams<{ deckId: string }>();

  const [questionCount, setQuestionCount] = useState<number>(10);
  const [direction, setDirection] = useState<Direction>('en-vi');
  const deck = useAppSelector(selectCurrentDeck)
  useEffect(() => {
    dispatch(fetchDeckById(deckId))
  }, [deckId]);

  const wordCount = deck?._count?.cards ?? 0;
  const availableOptions = QUESTION_COUNT_OPTIONS.filter(n => n <= wordCount);

  const handleStart = () => {
    sessionStorage.setItem(
      `game-config-${deckId}`,
      JSON.stringify({ questionCount, direction })
    );
    router.push(`/games/multiple-choice/${deckId}/play`);
  };

  if (!deck) return null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <p className="text-xs text-muted-foreground">{deck.name}</p>
          <h1 className="text-lg font-medium">Multiple choice</h1>
        </div>
      </div>

      {/* Config card */}
      <Card className="p-5 mb-4">
        <p className="text-sm font-medium mb-1">Game settings</p>
        <p className="text-xs text-muted-foreground mb-5">
          {wordCount} words available in this deck
        </p>

        {/* Số câu hỏi */}
        <div className="mb-5">
          <p className="text-xs text-muted-foreground mb-2">Number of questions</p>
          <div className="flex gap-2 flex-wrap">
            {availableOptions.map(n => (
              <button
                key={n}
                onClick={() => setQuestionCount(n)}
                className={`
                  px-4 py-1.5 rounded-full border text-sm transition-all
                  ${questionCount === n
                    ? 'bg-[#E1F5EE] border-[#5DCAA5] text-[#085041] font-medium'
                    : 'border-border text-muted-foreground hover:border-[#1D9E75]'}
                `}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setQuestionCount(wordCount)}
              className={`
                px-4 py-1.5 rounded-full border text-sm transition-all
                ${questionCount === wordCount
                  ? 'bg-[#E1F5EE] border-[#5DCAA5] text-[#085041] font-medium'
                  : 'border-border text-muted-foreground hover:border-[#1D9E75]'}
              `}
            >
              All ({wordCount})
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Direction</p>
          <div className="flex gap-2">
            {(['en-vi', 'vi-en'] as Direction[]).map(d => (
              <button
                key={d}
                onClick={() => setDirection(d)}
                className={`
                  px-4 py-1.5 rounded-full border text-sm transition-all
                  ${direction === d
                    ? 'bg-[#E1F5EE] border-[#5DCAA5] text-[#085041] font-medium'
                    : 'border-border text-muted-foreground hover:border-[#1D9E75]'}
                `}
              >
                {d === 'en-vi' ? 'English → Vietnamese' : 'Vietnamese → English'}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex gap-2 mb-6">
        <Badge variant="secondary" className="gap-1">
          <Clock className="w-3 h-3" /> 10s per question
        </Badge>
        <Badge variant="secondary" className="gap-1">
          <Layers className="w-3 h-3" /> 4 choices
        </Badge>
      </div>

      <Button
        className="w-full bg-[#1D9E75] hover:bg-[#0F6E56] text-white"
        onClick={handleStart}
      >
        Start game
      </Button>
    </div>
  );
}