// components/OptionList.tsx
import { AnswerState } from '../hooks/useGameSession';
import { Question } from '../utils/buildQuestion';

interface Props {
  question: Question;
  selectedOption: string | null;
  answerState: AnswerState;
  direction: 'en-vi' | 'vi-en';
  onSelect: (option: string) => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

function getOptionStyle(
  option: string,
  correctAnswer: string,
  selectedOption: string | null,
  answerState: AnswerState
): string {
  if (answerState === 'unanswered') {
    return 'border-border hover:border-[#1D9E75] hover:bg-[#E1F5EE] cursor-pointer';
  }

  const isCorrect = option === correctAnswer;
  const isSelected = option === selectedOption;

  if (isCorrect && answerState === 'timeout') {
    return 'border-[#FAC775] bg-[#FAEEDA] cursor-default';
  }
  if (isCorrect) {
    return 'border-[#5DCAA5] bg-[#E1F5EE] cursor-default';
  }
  if (isSelected) {
    return 'border-[#F09595] bg-[#FCEBEB] cursor-default';
  }
  return 'opacity-50 cursor-default';
}

export function OptionList({ question, selectedOption, answerState, direction, onSelect }: Props) {
  const isEnVi = direction === 'en-vi';

  return (
    <div className="flex flex-col gap-2.5 mb-4">
      {question.options.map((option, i) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`
            flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left w-full transition-all
            ${getOptionStyle(option, question.correctAnswer, selectedOption, answerState)}
          `}
        >
          <span className="w-7 h-7 rounded-lg bg-muted border flex items-center justify-center text-xs font-medium text-muted-foreground flex-shrink-0">
            {LETTERS[i]}
          </span>
          <span className={`text-sm ${!isEnVi ? 'font-medium' : ''}`}>
            {option}
          </span>
        </button>
      ))}
    </div>
  );
}