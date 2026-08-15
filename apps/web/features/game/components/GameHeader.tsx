import { Button } from '@/components/ui/button';
import { X, CheckCircle2, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  correctCount: number;
  wrongCount: number;
}

export function GameHeader({ correctCount, wrongCount }: Props) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-3 mb-5">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <X className="w-4 h-4" />
      </Button>
      <p className="flex-1 text-xs text-muted-foreground">Multiple choice</p>
      <div className="flex gap-2">
        <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[#EAF3DE] text-[#3B6D11] border border-[#97C459]">
          <CheckCircle2 className="w-3 h-3" /> {correctCount}
        </span>
        <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[#FCEBEB] text-[#A32D2D] border border-[#F09595]">
          <XCircle className="w-3 h-3" /> {wrongCount}
        </span>
      </div>
    </div>
  );
}