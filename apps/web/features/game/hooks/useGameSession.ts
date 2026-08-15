import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { buildQuestion, Question } from "../utils/buildQuestion";
import { fetchCards, selectCards } from "@/features/card/store/card.slice";
import { useQuestionTimer } from "./useQuestionTimer";
import { useAutoNext } from "./useAutoNext";

export type AnswerState = "unanswered" | "correct" | "wrong" | "timeout";

interface GameConfig {
  questionCount: number;
  direction: "en-vi" | "vi-en";
}

const QUESTION_TIME = 10;
const AUTO_NEXT_TIME = 3;

export function useGameSession(deckId: string) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");

  const [results, setResults] = useState<AnswerState[]>([]);

  const cards = useAppSelector(selectCards);

  const [config] = useState<GameConfig | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(`game-config-${deckId}`);
    return raw ? (JSON.parse(raw) as GameConfig) : null;
  });

  useEffect(() => {
    if (!config) {
      router.replace(`/games/multiple-choice/${deckId}`);
      return;
    }
    // Consume the config so a stale revisit to this page (without going
    // through Setup again) can't silently replay the previous game's settings.
    sessionStorage.removeItem(`game-config-${deckId}`);
    dispatch(fetchCards(deckId));
  }, [config, deckId, dispatch, router]);

  const questions = useMemo<Question[]>(() => {
    if (!config || cards.length === 0) return [];
    return buildQuestion(cards, config.questionCount, config.direction);
  }, []);

  const goNext = () => {
    const updatedResults = [...results, answerState];
    if (currentIndex + 1 >= questions.length) {
      sessionStorage.setItem(
        `game-results-${deckId}`,
        JSON.stringify(updatedResults),
      );
      router.push(`/games/multiple-choice/${deckId}/result`);
      return;
    }
    setResults(updatedResults);
    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setAnswerState("unanswered");
  };
  const handleAnswered = useCallback((state: AnswerState) => {
    setAnswerState(state);
  }, []);

  const handleSelectOption = useCallback(
    (option: string) => {
      if (answerState !== "unanswered") return;
      setSelectedOption(option);
      const isCorrect = option === questions[currentIndex]?.correctAnswer;
      handleAnswered(isCorrect ? "correct" : "wrong");
    },
    [answerState, currentIndex, questions],
  );

  const { timeLeft } = useQuestionTimer({
    duration: QUESTION_TIME,
    enabled: answerState === "unanswered" && questions.length > 0,
    onTimeout: () => handleAnswered("timeout"),
  });

  const { autoNextLeft } = useAutoNext({
    duration: AUTO_NEXT_TIME,
    enabled: answerState !== "unanswered",
    onNext: goNext,
  });

  const correctCount = results.filter((r) => r === "correct").length;
  const wrongCount = results.filter((r) => r !== "correct").length;
  return {
    // Data
    question: questions[currentIndex] ?? null,
    currentIndex,
    totalQuestions: questions.length,
    selectedOption,
    answerState,

    // Timer
    timeLeft,
    autoNextLeft,

    // Stats
    correctCount,
    wrongCount,

    // Action
    handleSelectOption,
    goNext,
    isLastQuestion: currentIndex + 1 >= questions.length,
    isLoading: questions.length === 0,

    config
  };
}
