"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Gamepad2,
  Layers,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import { EditDeckDialog } from "./EditDeckDialog";
import {
  deleteDeck,
  selectDeleteDeckLoading,
} from "@/features/deck/store/deck.slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import type { Deck } from "@/shared/types";
import { GAME_MODES } from "@/features/game/constants";
import GameSelectModal from "@/features/game/components/GameSelectModal";

function formatLevel(level: Deck["level"]) {
  return level.charAt(0) + level.slice(1).toLowerCase();
}

export function DeckCard({ deck }: { deck: Deck }) {
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectDeleteDeckLoading);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const cardCount = deck._count?.cards ?? 0;

  async function handleDelete() {
    try {
      await dispatch(deleteDeck(deck.id)).unwrap();
      toast.add({
        title: "Deck deleted",
        description: `"${deck.name}" has been removed.`,
        type: "success",
      });
      setDeleteOpen(false);
    } catch (error) {
      toast.add({
        title: "Failed to delete deck",
        description: typeof error === "string" ? error : "Something went wrong",
        type: "error",
      });
    }
  }

  return (
    <Card className="group/deck transition-transform hover:-translate-y-1">
      <CardHeader>
        <span
          className="mb-1 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"
          aria-hidden="true"
        >
          <Layers className="size-5" />
        </span>
        <CardTitle className="font-display text-lg">
          <Link href={`/decks/${deck.id}`} className="hover:underline">
            {deck.name}
          </Link>
        </CardTitle>
        {deck.description ? (
          <CardDescription className="leading-relaxed">
            {deck.description}
          </CardDescription>
        ) : null}
        <CardAction className="flex items-center gap-1">
          <Badge variant="outline">{formatLevel(deck.level)}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon-sm" />}
            >
              <MoreVertical />
              <span className="sr-only">Deck actions</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Layers className="size-3.5" />
            {cardCount} {cardCount === 1 ? "word" : "words"}
          </span>
          {deck.topic ? <span>{deck.topic}</span> : null}
        </div>
      </CardContent>

      <CardFooter className="gap-2 border-t">
        <Button
          size="sm"
          className="flex-1"
          render={<Link href={`/decks/${deck.id}/study`} />}
        >
          <BookOpen data-icon="inline-start" />
          Study
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => setGameOpen(true)}
        >
          <Gamepad2 data-icon="inline-start" />
          Play
        </Button>
      </CardFooter>

      <EditDeckDialog deck={deck} open={editOpen} onOpenChange={setEditOpen} />

      {gameOpen && (
        <GameSelectModal
          deck={deck}
          gameModes={GAME_MODES}
          onClose={() => setGameOpen(false)}
        />
      )}

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &quot;{deck.name}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this deck and all {cardCount}{" "}
              {cardCount === 1 ? "word" : "words"} in it. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
