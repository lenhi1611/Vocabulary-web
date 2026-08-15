"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDemoGameSession } from "../hooks/useDemoGameSession";
import { GameHeader } from "../components/GameHeader";
import { QuestionCard } from "../components/QuestionCard";
import { OptionList } from "../components/OptionList";
import { AnswerFeedback } from "../components/AnswerFeedback";
import { NextButton } from "../components/NextButton";

export default function DemoGamePage() {
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
    isFinished,
    direction,
  } = useDemoGameSession();

  if (isFinished) {
    const total = correctCount + wrongCount;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-4 py-16 text-center">
        <Sparkles className="mb-4 size-8 text-[#1D9E75]" />
        <h1 className="font-display text-2xl font-semibold mb-1">
          {percentage}% correct
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          You got {correctCount} out of {total} words right. Sign up free to
          save your progress and unlock the full deck library.
        </p>
        <div className="flex w-full flex-col gap-2">
          <Button
            className="w-full bg-[#1D9E75] hover:bg-[#0F6E56] text-white"
            render={<Link href="/signup" />}
          >
            Create a free account
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button variant="outline" className="w-full" render={<Link href="/" />}>
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  if (!question) return null;

  const progress = (currentIndex / totalQuestions) * 100;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <Badge variant="secondary" className="mb-4">
        Guest demo — sign up to save your results
      </Badge>

      <GameHeader correctCount={correctCount} wrongCount={wrongCount} />

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
        direction={direction}
      />
      <OptionList
        question={question}
        selectedOption={selectedOption}
        answerState={answerState}
        onSelect={handleSelectOption}
        direction={direction}
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
