"use client";

import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { SpeakButton } from "@/shared/components/audio/SpeakButton";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { deleteCard, selectDeleteCardLoading } from "@/features/card/store/card.slice";
import { adjustDeckCardCount } from "@/features/deck/store/deck.slice";
import { EditCardDialog } from "./EditCardDialog";
import type { Card as CardType } from "@/shared/types";

export function WordListItem({ word }: { word: CardType }) {
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectDeleteCardLoading);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function handleDelete() {
    try {
      await dispatch(deleteCard(word.id)).unwrap();
      dispatch(adjustDeckCardCount({ deckId: word.deckId, delta: -1 }));
      toast.add({
        title: "Word deleted",
        description: `"${word.word}" has been removed from the deck.`,
        type: "success",
      });
      setDeleteOpen(false);
    } catch (error) {
      toast.add({
        title: "Failed to delete word",
        description: typeof error === "string" ? error : "Something went wrong",
        type: "error",
      });
    }
  }

  return (
    <>
      <Card size="sm" className="group/word">
        <CardContent className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-display text-base font-semibold">
                {word.word}
              </span>
              <SpeakButton text={word.word} size="icon-xs" />
              {word.phonetic ? (
                <span className="text-xs text-muted-foreground">
                  {word.phonetic}
                </span>
              ) : null}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon-sm" />}
              >
                <MoreVertical />
                <span className="sr-only">Word actions</span>
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
          </div>

          <p className="text-sm leading-relaxed">{word.meaningVi}</p>
          {word.meaningEn ? (
            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {word.meaningEn}
            </p>
          ) : null}
          {word.example ? (
            <p className="text-sm leading-relaxed text-muted-foreground italic">
              &ldquo;{word.example}&rdquo;
            </p>
          ) : null}
        </CardContent>
      </Card>

      <EditCardDialog card={word} open={editOpen} onOpenChange={setEditOpen} />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &quot;{word.word}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this word from the deck. This
              action cannot be undone.
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
    </>
  );
}
