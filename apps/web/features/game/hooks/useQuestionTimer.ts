import { useEffect, useRef, useState } from "react";

interface Options {
  duration: number;
  enabled: boolean;
  onTimeout: () => void;
}

export function useQuestionTimer({ duration, enabled, onTimeout }: Options) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    if (!enabled) return;
    let left = duration;
    const interval = setInterval(() => {
      left--;
      setTimeLeft(left);
      if (left <= 0) {
        clearInterval(interval);
        onTimeoutRef.current();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [duration, enabled]);
  return { timeLeft };
}
