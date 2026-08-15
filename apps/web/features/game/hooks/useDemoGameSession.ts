import { useCallback, useMemo, useState } from "react";
import { buildQuestion, Question } from "../utils/buildQuestion";
import { DEMO_CARDS } from "../constants/demoCards";
import { AnswerState } from "./useGameSession";
import { useQuestionTimer } from "./useQuestionTimer";
import { useAutoNext } from "./useAutoNext";

const QUESTION_TIME = 10;
const AUTO_NEXT_TIME = 3;
const QUESTION_COUNT = 5;
const DIRECTION = "en-vi" as const;

// Self-contained variant of useGameSession for guests: no deckId, no
// sessionStorage config, no Redux/API calls — just a fixed set of mock
// cards so anyone can try the game before creating an account.
export function useDemoGameSession() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [results, setResults] = useState<AnswerState[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const questions = useMemo<Question[]>(
    () => buildQuestion(DEMO_CARDS, QUESTION_COUNT, DIRECTION),
    [],
  );

  const goNext = () => {
    const updatedResults = [...results, answerState];
    setResults(updatedResults);
    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true);
      return;
    }
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
    enabled: answerState === "unanswered" && !isFinished,
    onTimeout: () => handleAnswered("timeout"),
  });

  const { autoNextLeft } = useAutoNext({
    duration: AUTO_NEXT_TIME,
    enabled: answerState !== "unanswered" && !isFinished,
    onNext: goNext,
  });

  const correctCount = results.filter((r) => r === "correct").length;
  const wrongCount = results.filter((r) => r !== "correct").length;

  return {
    question: questions[currentIndex] ?? null,
    currentIndex,
    totalQuestions: questions.length,
    selectedOption,
    answerState,

    timeLeft,
    autoNextLeft,

    correctCount,
    wrongCount,

    handleSelectOption,
    goNext,
    isLastQuestion: currentIndex + 1 >= questions.length,
    isFinished,

    direction: DIRECTION,
  };
}
