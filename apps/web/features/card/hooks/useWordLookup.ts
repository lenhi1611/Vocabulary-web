import { useCallback, useEffect, useRef, useState } from "react";
import {
  dictionaryService,
  WordSuggestion,
} from "../services/dictionary.service";

export function useWordLookup() {
  const [suggestion, setSuggestion] = useState<WordSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lookup = useCallback((word: string) => {
    // remove old timer
    if (debounceRef.current) clearTimeout(debounceRef?.current);
    if (!word.trim() || word.trim().length < 2) {
      setSuggestion(null);

      return;
    }
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      const result = await dictionaryService.lookup(word);
      setSuggestion(result);
      setIsLoading(false);
    }, 600);
  }, []);
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);
  const clearSuggestion = useCallback(() => setSuggestion(null), []);

  return { suggestion, isLoading, lookup, clearSuggestion };
}
