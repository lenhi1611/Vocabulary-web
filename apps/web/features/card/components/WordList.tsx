"use client";

import { useMemo, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import type { Card as CardType } from "@/shared/types";
import { WordListItem } from "./WordListItem";

type WordListProps = {
  words: CardType[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
};

export function WordList({
  words,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: WordListProps) {
  const [query, setQuery] = useState("");
  const isSearching = query.trim().length > 0;

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return words;
    return words.filter(
      (word) =>
        word.word.toLowerCase().includes(search) ||
        word.meaningVi.toLowerCase().includes(search) ||
        word.meaningEn?.toLowerCase().includes(search),
    );
  }, [words, query]);

  // Loading more only makes sense against the full, unfiltered list — search
  // only matches what's already been fetched, so pagination pauses while it's active.
  const { sentinelRef } = useInfiniteScroll({
    hasMore: hasMore && !isSearching,
    isLoading: isLoadingMore,
    onLoadMore: onLoadMore ?? (() => {}),
  });

  return (
    <div className="flex flex-col gap-4">
      <InputGroup className="h-9 sm:max-w-xs">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search words"
          aria-label="Search words"
        />
      </InputGroup>

      {visible.length === 0 ? (
        <Empty className="rounded-xl bg-secondary/50">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search />
            </EmptyMedia>
            <EmptyTitle className="font-display">No words found</EmptyTitle>
            <EmptyDescription>
              {words.length === 0
                ? "This deck doesn't have any words yet."
                : "Try a different search."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="flex flex-col gap-3">
          {visible.map((word) => (
            <li key={word.id}>
              <WordListItem word={word} />
            </li>
          ))}
        </ul>
      )}

      {hasMore && !isSearching ? (
        <div ref={sentinelRef} className="flex justify-center py-2">
          {isLoadingMore ? (
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading more...
            </span>
          ) : (
            <Button variant="outline" size="sm" onClick={onLoadMore}>
              Load more
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
