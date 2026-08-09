"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, SubmitButton } from "@/shared/components/form/Form";
import {
  CreateCardFormData,
  createCardSchema,
} from "@/features/card/schemas/card.schema";
import { CardFormFields } from "./CardFormFields";
import {
  updateCard,
  selectUpdateCardLoading,
} from "@/features/card/store/card.slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import type { Card } from "@/shared/types";

type EditCardDialogProps = {
  card: Card;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditCardDialog({
  card,
  open,
  onOpenChange,
}: EditCardDialogProps) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectUpdateCardLoading);

  async function handleSubmit(values: CreateCardFormData) {
    try {
      await dispatch(updateCard({ id: card.id, data: values })).unwrap();
      toast.add({
        title: "Word updated",
        description: `"${values.word}" has been saved.`,
        type: "success",
      });
      onOpenChange(false);
    } catch (error) {
      toast.add({
        title: "Failed to update word",
        description: typeof error === "string" ? error : "Something went wrong",
        type: "error",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Edit word</DialogTitle>
          <DialogDescription>
            Update the details for this word.
          </DialogDescription>
        </DialogHeader>

        <Form<CreateCardFormData>
          className="py-6"
          onSubmit={handleSubmit}
          defaultValues={{
            word: card.word,
            phonetic: card.phonetic ?? "",
            meaning: card.meaning,
            example: card.example ?? "",
          }}
          options={{
            mode: "onChange",
            resolver: zodResolver(createCardSchema),
          }}
        >
          <CardFormFields />

          <div className="mt-2 flex items-end justify-end gap-2">
            <DialogClose
              render={<Button variant="ghost" size="lg" type="button" />}
            >
              Cancel
            </DialogClose>
            <SubmitButton
              isLoading={isLoading}
              type="submit"
              size="lg"
              className="w-fit"
            >
              Save changes
            </SubmitButton>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
