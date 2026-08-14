export type StudyRating = 0 | 1 | 2 | 3;

export type StudyRatingOption = {
  key: StudyRating;
  label: string;
  /** Display-only spaced-repetition style interval; not persisted anywhere yet. */
  intervalLabel: string;
  className: string;
};

/**
 * Single source of truth for the rating scale shown after a card is
 * revealed. Add/remove/relabel a rating here and every consumer (buttons,
 * stats) picks it up automatically.
 */
export const STUDY_RATING_OPTIONS: StudyRatingOption[] = [
  {
    key: 0,
    label: "Again",
    intervalLabel: "1 min",
    className: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  },
  {
    key: 1,
    label: "Hard",
    intervalLabel: "6 min",
    className: "bg-accent/20 text-accent-foreground hover:bg-accent/30",
  },
  {
    key: 2,
    label: "Good",
    intervalLabel: "1 day",
    className: "bg-primary/10 text-primary hover:bg-primary/20",
  },
  {
    key: 3,
    label: "Easy",
    intervalLabel: "4 days",
    className: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
];

/** Ratings that count as a successful recall for the accuracy stat. */
export const REMEMBERED_RATINGS: StudyRating[] = [2, 3];
