// components/QuestionCard.tsx
import { Clock } from 'lucide-react';
import { AnswerState } from '../hooks/useGameSession';
import { Card } from '@/shared/types';

interface Props {
  card: Card;
  timeLeft: number;
  answerState: AnswerState;
  direction: 'en-vi' | 'vi-en';
}

const QUESTION_TIME = 10;
const CIRCUMFERENCE = 169.6;

export function QuestionCard({ card, timeLeft, answerState, direction }: Props) {
  const ringColor =
    timeLeft <= 3 ? '#E24B4A' :
    timeLeft <= 6 ? '#BA7517' :
    '#1D9E75';

  const timerColor =
    timeLeft <= 3 ? 'text-red-500' :
    timeLeft <= 6 ? 'text-amber-500' :
    'text-[#1D9E75]';

  const ringOffset = CIRCUMFERENCE * (1 - timeLeft / QUESTION_TIME);

  // Thay đổi theo direction
  const isEnVi = direction === 'en-vi';
  const questionLabel = isEnVi ? 'WHAT DOES THIS MEAN?' : 'HOW DO YOU SAY THIS IN ENGLISH?';
  const questionText = isEnVi ? card.word : card.meaningVi;

  const showMeta = isEnVi;

  return (
    <div className="rounded-2xl border bg-card p-6 text-center mb-4">
      {/* Timer ring */}
      <div className="relative w-16 h-16 mx-auto mb-4">
        <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="32" cy="32" r="27" fill="none" stroke="var(--border)" strokeWidth="4" />
          <circle
            cx="32" cy="32" r="27" fill="none"
            stroke={ringColor} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={ringOffset}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-sm font-medium ${timerColor}`}>
          {answerState === 'unanswered'
            ? timeLeft
            : <Clock className="w-4 h-4 text-muted-foreground" />}
        </span>
      </div>

      <p className="text-xs text-muted-foreground mb-2 tracking-wide">{questionLabel}</p>
      <p className="text-3xl font-medium mb-1">{questionText}</p>

      {showMeta && (
        <>
          {card.phonetic && (
            <p className="text-sm text-muted-foreground italic">{card.phonetic}</p>
          )}
        </>
      )}
    </div>
  );
}