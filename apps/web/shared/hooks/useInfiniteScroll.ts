"use client";

import { useEffect, useRef } from "react";

type UseInfiniteScrollOptions = {
  /** Whether there is another page to fetch. */
  hasMore: boolean;
  /** Prevents overlapping fetches while a page is already in flight. */
  isLoading: boolean;
  onLoadMore: () => void;
  /** How far before the sentinel enters the viewport to trigger a fetch. */
  rootMargin?: string;
};

/**
 * Observes a sentinel element and calls `onLoadMore` once it scrolls into
 * view. Render the returned ref on an empty element at the bottom of the
 * list; when `hasMore` is false the observer is torn down entirely.
 */
export function useInfiniteScroll({
  hasMore,
  isLoading,
  onLoadMore,
  rootMargin = "200px",
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const onLoadMoreRef = useRef(onLoadMore);
  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
    isLoadingRef.current = isLoading;
  }, [onLoadMore, isLoading]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoadingRef.current) {
          onLoadMoreRef.current();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, rootMargin]);

  return { sentinelRef };
}
