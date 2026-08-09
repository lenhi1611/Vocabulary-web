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
import { TextField } from "@/shared/components/form/TextField";
import { ToggleGroupField } from "@/shared/components/form/ToggleGroupField";
import {
  CreateDeckFormData,
  createDeckSchema,
} from "@/features/deck/schemas/deck.schema";
import { DECK_LEVEL } from "@/features/deck/constant";
import { updateDeck, selectUpdateDeckLoading } from "@/features/deck/store/deck.slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import type { Deck } from "@/shared/types";

const levelOptions = DECK_LEVEL.map((level) => ({
  label: level.charAt(0) + level.slice(1).toLowerCase(),
  value: level,
}));

type EditDeckDialogProps = {
  deck: Deck;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditDeckDialog({ deck, open, onOpenChange }: EditDeckDialogProps) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectUpdateDeckLoading);

  async function handleSubmit(values: CreateDeckFormData) {
    try {
      await dispatch(updateDeck({ deckId: deck.id, data: values })).unwrap();
      toast.add({
        title: "Deck updated",
        description: `"${values.name}" has been saved.`,
        type: "success",
      });
      onOpenChange(false);
    } catch (error) {
      toast.add({
        title: "Failed to update deck",
        description: typeof error === "string" ? error : "Something went wrong",
        type: "error",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Edit deck</DialogTitle>
          <DialogDescription>
            Update the details for this deck.
          </DialogDescription>
        </DialogHeader>

        <Form<CreateDeckFormData>
          className="py-6"
          onSubmit={handleSubmit}
          defaultValues={{
            name: deck.name,
            description: deck.description ?? "",
            level: deck.level,
            topic: deck.topic ?? "",
          }}
          options={{
            mode: "onChange",
            resolver: zodResolver(createDeckSchema),
          }}
        >
          <TextField<CreateDeckFormData>
            name="name"
            label="Title"
            placeholder="e.g. Travel &amp; Airport"
            className="mb-2"
          />
          <TextField<CreateDeckFormData>
            name="description"
            label="Description"
            placeholder="What kind of words will live in this deck?"
            type="textarea"
            className="mb-2"
          />

          <ToggleGroupField<CreateDeckFormData>
            name="level"
            label="Level"
            options={levelOptions}
            className="mb-2"
          />

          <div className="mt-7 flex items-end justify-end gap-2">
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
