'use client';
import { NotebookPen, CardSim, LucideIcon } from 'lucide-react';

interface GameMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  minCards: number;
  comingSoon?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  cards: CardSim,
  writing: NotebookPen,
};

export default function GameModeCard({ mode }: { mode: GameMode }) {
  const Icon = iconMap[mode.icon];
  return (
    <div
      className={`
        rounded-2xl border p-4 flex items-start gap-3
        ${mode.comingSoon
          ? 'border-border opacity-50 cursor-not-allowed'
          : 'border-border hover:border-[#1D9E75] hover:bg-[#E1F5EE] cursor-pointer transition-all'}
      `}
    >
      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
        <Icon/>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{mode.name}</p>
          {mode.comingSoon && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
              Soon
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
          {mode.description}
        </p>
      </div>
    </div>
  );
}