"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, SubmitButton } from "@/shared/components/form/Form";
import { ToggleGroupField } from "@/shared/components/form/ToggleGroupField";
import {
  CreateDeckFormData,
  createDeckSchema,
} from "@/features/deck/schemas/deck.schema";
import { DECK_LEVEL } from "@/features/deck/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/shared/components/form/TextField";
import { useAppDispatch } from "@/shared/store/hooks";
import {
  createDeck,
  selectCreateDeckLoading,
} from "@/features/deck/store/deck.slice";
import { useSelector } from "react-redux";

const levelOptions = DECK_LEVEL.map((level) => ({
  label: level.charAt(0) + level.slice(1).toLowerCase(),
  value: level,
}));

export function CreateDeckDialog() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const isLoading = useSelector(selectCreateDeckLoading);
  async function handleSubmit(values: CreateDeckFormData) {
    try {
      const deck = await dispatch(createDeck(values)).unwrap();
      toast.add({
        title: "Deck created",
        description: `"${deck.name}" is ready to study.`,
        type: "success",
      });
      setOpen(false);
    } catch (error) {
      toast.add({
        title: "Failed to create deck",
        description: typeof error === "string" ? error : "Something went wrong",
        type: "error",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="lg" className="h-10" />}>
        <Plus data-icon="inline-start" />
        New deck
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Create a new deck</DialogTitle>
          <DialogDescription>
            Group words by topic so every study session stays focused.
          </DialogDescription>
        </DialogHeader>

        <Form<CreateDeckFormData>
          className="py-6"
          onSubmit={handleSubmit}
          defaultValues={{ level: "BEGINNER" }}
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
          <div className="mt-7 flex justify-end items-end gap-2">
            <DialogClose
              render={<Button variant="ghost" size="lg" type="button" />}
            >
              Cancel
            </DialogClose>
            <SubmitButton
              isLoading={isLoading}
              type="submit"
              size="lg"
              className={"w-fit"}
            >
              Create deck
            </SubmitButton>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
