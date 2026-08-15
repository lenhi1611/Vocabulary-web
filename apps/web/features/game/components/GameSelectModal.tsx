"use client";

import { Deck } from "@/shared/types";
import { CardSim, LucideIcon, NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface GameMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  minCards: number;
  comingSoon?: boolean;
}

interface Props {
  deck: Deck;
  gameModes: GameMode[];
  onClose: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  cards: CardSim,
  writing: NotebookPen,
};

export default function GameSelectModal({ deck, gameModes, onClose }: Props) {
  const router = useRouter();
  const wordCount = deck._count?.cards ?? 0;

  const handleSelect = (modeId: string) => {
    router.push(`/games/${modeId}/${deck.id}`);
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                      w-full max-w-sm bg-white rounded-2xl border border-border p-5 shadow-lg"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Play with</p>
            <p className="text-base font-medium">{deck.name}</p>
            <p className="text-xs text-gray-400">{wordCount} words</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {gameModes.map((mode) => {
            const disabled = mode.comingSoon || wordCount < mode.minCards;
            const Icon = iconMap[mode.icon];
            return (
              <button
                key={mode.id}
                disabled={disabled}
                onClick={() => handleSelect(mode.id)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl border text-left w-full transition-all
                  ${
                    disabled
                      ? "border-border opacity-50 cursor-not-allowed"
                      : "border-border hover:border-[#1D9E75] hover:bg-[#E1F5EE]"
                  }
                `}
              >
                <span className="text-xl">
                  <Icon />
                </span>
                <div>
                  <p className="text-sm font-medium">{mode.name}</p>
                  <p className="text-xs text-gray-400">{mode.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>,
    document.body
  );
}
