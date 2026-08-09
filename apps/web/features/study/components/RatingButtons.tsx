import { cn } from "@/lib/utils";
import { STUDY_RATING_OPTIONS, StudyRating } from "@/features/study/constants";

type RatingButtonsProps = {
  onRate: (rating: StudyRating) => void;
};

export function RatingButtons({ onRate }: RatingButtonsProps) {
  return (
    <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
      {STUDY_RATING_OPTIONS.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onRate(option.key)}
          className={cn(
            "flex flex-col items-center gap-0.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
            option.className,
          )}
        >
          <span>{option.label}</span>
          <span className="text-xs font-normal opacity-70">
            {option.intervalLabel}
          </span>
        </button>
      ))}
    </div>
  );
}
