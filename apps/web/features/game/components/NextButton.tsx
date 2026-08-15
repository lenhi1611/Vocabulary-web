import { Button } from '@/components/ui/button';

interface Props {
  autoNextLeft: number;
  isLastQuestion: boolean;
  onNext: () => void;
}

const AUTO_NEXT_TIME = 5;

export function NextButton({ autoNextLeft, isLastQuestion, onNext }: Props) {
  return (
    <div>
      <Button
        className="w-full bg-[#1D9E75] hover:bg-[#0F6E56] text-white mb-2"
        onClick={onNext}
      >
        {isLastQuestion ? 'See results' : 'Next question'}
      </Button>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-muted-foreground/30 rounded-full transition-all duration-1000"
            style={{ width: `${(autoNextLeft / AUTO_NEXT_TIME) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground w-16 text-right">
          Next in {autoNextLeft}s
        </span>
      </div>
    </div>
  );
}