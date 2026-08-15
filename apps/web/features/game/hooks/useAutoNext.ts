import { useEffect, useRef, useState } from "react";

interface Options {
  duration: number;
  enabled: boolean;
  onNext: () => void;
}

export function useAutoNext({ duration, enabled, onNext }: Options) {
  const [autoNextLeft, setAutoNextLeft] = useState(duration);
  const onNextRef = useRef(onNext);

  useEffect(() => {
    if (!enabled) return;
    let left = duration;

    const interval = setInterval(() => {
      left--;
      setAutoNextLeft(left);
      if (left <= 0) {
        clearInterval(interval);
        onNextRef.current();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [duration, enabled]);
  return { autoNextLeft };
}
