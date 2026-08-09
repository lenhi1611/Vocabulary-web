import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type StudyNavArrowProps = {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
};

export function StudyNavArrow({ direction, onClick, disabled }: StudyNavArrowProps) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  const label = direction === "prev" ? "Previous word" : "Next word";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      className="shrink-0 rounded-full"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <Icon />
    </Button>
  );
}
