export type Rating = 0 | 1 | 2 | 3; // Again, Hard, Good, Easy

export type IntervalUnit = "minute" | "day";

export type SM2result = {
  ease: number;
  interval: number;
  intervalUnit: IntervalUnit;
  repetitions: number;
  nextReview: Date;
  label: string;
};

export function calculateSM2(
  rating: Rating,
  ease: number,
  interval: number,
  repetitions: number,
): SM2result {
  let newEase = ease;
  let newInterval = interval;
  let newRepetitions = repetitions;
  let intervalUnit: IntervalUnit = "day";

  if (rating === 0) {
    // Again
    newRepetitions = 0;
    newInterval = 1;
    intervalUnit = "minute";
    newEase = Math.max(1.3, ease - 0.2);
  } else if (rating === 1) {
    // Hard
    newRepetitions = newRepetitions + 1;
    newInterval = Math.round(interval * 1.2);
    newEase = Math.max(1.3, ease - 0.15);
    intervalUnit = repetitions === 0 ? "minute" : "day";
  } else if (rating === 2) {
    // Good
    newRepetitions = newRepetitions + 1;
    newInterval =
      newRepetitions === 1
        ? 1
        : newRepetitions === 2
          ? 6
          : Math.round(interval * ease);

    // ease no change
  } else {
    // Easy
    newRepetitions = newRepetitions + 1;
    newInterval = newRepetitions === 1 ? 4 : Math.round(interval * ease * 1.3);
    newEase = Math.min(4, ease + 0.15);
  }

  const nextReview = new Date();
  if (intervalUnit === "minute") {
    nextReview.setMinutes(nextReview.getMinutes() + newInterval);
  } else {
    nextReview.setDate(nextReview.getDate() + newInterval);
  }

  return {
    ease: newEase,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReview: nextReview,
    intervalUnit,
    label: formatLabel(interval, intervalUnit),
  };
}

function formatLabel(interval: number, unit: IntervalUnit): string {
  if (unit === "minute") {
    return interval === 1 ? "1 min" : `${interval} mins`;
  }
  if (interval === 1) return "1 day";
  if (interval < 30) return `${interval} days`;
  if (interval < 365) return `${Math.round(interval / 30)} months`;
  return `${Math.round(interval / 365)} years`;
}

export function previewLabels(
  ease: number,
  interval: number,
  repetitions: number,
): Record<Rating, string> {
  return {
    0: calculateSM2(0, ease, interval, repetitions).label,
    1: calculateSM2(1, ease, interval, repetitions).label,
    2: calculateSM2(2, ease, interval, repetitions).label,
    3: calculateSM2(3, ease, interval, repetitions).label,
  };
}
