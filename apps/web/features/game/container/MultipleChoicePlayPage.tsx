"use client";

import { useParams } from "next/navigation";
import { useGameSession } from "../hooks/useGameSession";
import { GameHeader } from "../components/GameHeader";
import { QuestionCard } from "../components/QuestionCard";
import { OptionList } from "../components/OptionList";
import { AnswerFeedback } from "../components/AnswerFeedback";
import { NextButton } from "../components/NextButton";

export default function MultipleChoicePlayPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const {
    question,
    currentIndex,
    totalQuestions,
    selectedOption,
    answerState,
    timeLeft,
    autoNextLeft,
    correctCount,
    wrongCount,
    handleSelectOption,
    goNext,
    isLastQuestion,
    isLoading,
    config,
  } = useGameSession(deckId);

  if (isLoading || !question || !config) return null;

  const progress = (currentIndex / totalQuestions) * 100;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <GameHeader correctCount={correctCount} wrongCount={wrongCount} />

      {/* Progress bar */}
      <div className="mb-5">
        <p className="text-xs text-muted-foreground mb-1.5">
          Question {currentIndex + 1} of {totalQuestions}
        </p>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-[#1D9E75] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <QuestionCard
        card={question.card}
        timeLeft={timeLeft}
        answerState={answerState}
        direction={config.direction}
      />
      <OptionList
        question={question}
        selectedOption={selectedOption}
        answerState={answerState}
        onSelect={handleSelectOption}
        direction={config.direction}
      />
      <AnswerFeedback
        answerState={answerState}
        correctAnswer={question.correctAnswer}
      />

      {answerState !== "unanswered" && (
        <NextButton
          autoNextLeft={autoNextLeft}
          isLastQuestion={isLastQuestion}
          onNext={goNext}
        />
      )}
    </div>
  );
}
