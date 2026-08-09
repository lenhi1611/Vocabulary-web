"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Wraps the browser's SpeechSynthesis API. `speakingText` tracks the exact
 * string currently being read aloud so callers can highlight the matching
 * trigger without each one owning its own utterance/state.
 */
export function useSpeak(lang = "en-US") {
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }
      const value = text.trim();
      if (!value) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(value);
      utterance.lang = lang;
      utterance.onstart = () => setSpeakingText(value);
      utterance.onend = () => setSpeakingText(null);
      utterance.onerror = () => setSpeakingText(null);
      window.speechSynthesis.speak(utterance);
    },
    [lang],
  );

  const isSpeaking = useCallback(
    (text: string) => speakingText === text.trim(),
    [speakingText],
  );

  return { speak, isSpeaking };
}
