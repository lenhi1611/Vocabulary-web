import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { AnswerState } from "../hooks/useGameSession";

interface Props {
  answerState: AnswerState;
  correctAnswer: string;
}

export function AnswerFeedback({ answerState, correctAnswer }: Props) {
  if (answerState === "unanswered") return null;

  const config = {
    correct: {
      icon: <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />,
      className: "bg-[#E1F5EE] border-[#9FE1CB] text-[#085041]",
      message: <>Correct!</>,
    },
    wrong: {
      icon: <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />,
      className: "bg-[#FCEBEB] border-[#F7C1C1] text-[#A32D2D]",
      message: (
        <>
          The correct answer is <strong>{correctAnswer}</strong>
        </>
      ),
    },
    timeout: {
      icon: <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />,
      className: "bg-[#FAEEDA] border-[#FAC775] text-[#854F0B]",
      message: (
        <>
          Time is up! The correct answer is <strong>{correctAnswer}</strong>
        </>
      ),
    },
  }[answerState];

  return (
    <div
      className={`flex items-start gap-2.5 p-3 rounded-xl border text-sm mb-4 ${config.className}`}
    >
      {config.icon}
      <span>{config.message}</span>
    </div>
  );
}
