"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, Trophy } from "lucide-react";
import { AnswerState } from "../hooks/useGameSession";

interface ResultStats {
  correct: number;
  wrong: number;
  timeout: number;
  total: number;
  percentage: number;
}

function computeStats(results: AnswerState[]): ResultStats {
  const correct = results.filter((r) => r === "correct").length;
  const wrong = results.filter((r) => r === "wrong").length;
  const timeout = results.filter((r) => r === "timeout").length;
  const total = results.length;
  const percentage = Math.round((correct / total) * 100);
  return { correct, wrong, timeout, total, percentage };
}

function getPerformanceLabel(percentage: number): {
  label: string;
  sub: string;
} {
  if (percentage === 100)
    return { label: "Perfect! 🎉", sub: "You got every single one right." };
  if (percentage >= 80)
    return {
      label: "Great work!",
      sub: "You're really getting the hang of it.",
    };
  if (percentage >= 60)
    return {
      label: "Good effort!",
      sub: "A bit more practice and you'll nail it.",
    };
  return {
    label: "Keep going!",
    sub: "Every mistake is a step toward mastery.",
  };
}

const CIRCUMFERENCE = 2 * Math.PI * 40; // r=40

export default function MultipleChoiceResultPage() {
  const router = useRouter();
  const { deckId } = useParams<{ deckId: string }>();
  const [stats, setStats] = useState<ResultStats | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`game-results-${deckId}`);
    if (!raw) {
      router.replace(`/games/multiple-choice/${deckId}`);
      return;
    }
    const results: AnswerState[] = JSON.parse(raw);
    setStats(computeStats(results));
  }, [deckId, router]);

  const handlePlayAgain = () => {
    sessionStorage.removeItem(`game-results-${deckId}`);
    router.push(`/games/multiple-choice/${deckId}`);
  };

  const handleBackToGames = () => {
    sessionStorage.removeItem(`game-results-${deckId}`);
    router.push("/games");
  };

  if (!stats) return null;

  const { label, sub } = getPerformanceLabel(stats.percentage);
  const ringOffset = CIRCUMFERENCE * (1 - stats.percentage / 100);
  const ringColor =
    stats.percentage >= 80
      ? "#1D9E75"
      : stats.percentage >= 60
        ? "#BA7517"
        : "#E24B4A";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      {/* Score ring */}
      <div className="flex flex-col items-center py-8">
        <div className="relative w-28 h-28 mb-5">
          <svg
            width="112"
            height="112"
            viewBox="0 0 112 112"
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx="56"
              cy="56"
              r="40"
              fill="none"
              stroke="var(--border)"
              strokeWidth="7"
            />
            <circle
              cx="56"
              cy="56"
              r="40"
              fill="none"
              stroke={ringColor}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={ringOffset}
              style={{ transition: "stroke-dashoffset 0.8s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-2xl font-semibold"
              style={{ color: ringColor }}
            >
              {stats.percentage}%
            </span>
            <span className="text-xs text-muted-foreground">score</span>
          </div>
        </div>

        <h1 className="text-xl font-medium mb-1">{label}</h1>
        <p className="text-sm text-muted-foreground text-center">{sub}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="rounded-xl border bg-card p-4 text-center">
          <CheckCircle2 className="w-4 h-4 text-[#1D9E75] mx-auto mb-1.5" />
          <p className="text-2xl font-medium text-[#3B6D11]">{stats.correct}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Correct</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <XCircle className="w-4 h-4 text-[#E24B4A] mx-auto mb-1.5" />
          <p className="text-2xl font-medium text-[#A32D2D]">{stats.wrong}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Wrong</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <Clock className="w-4 h-4 text-[#BA7517] mx-auto mb-1.5" />
          <p className="text-2xl font-medium text-[#854F0B]">{stats.timeout}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Timeout</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Button
          className="w-full bg-[#1D9E75] hover:bg-[#0F6E56] text-white"
          onClick={handlePlayAgain}
        >
          Play again
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleBackToGames}
        >
          Back to games
        </Button>
      </div>
    </div>
  );
}
