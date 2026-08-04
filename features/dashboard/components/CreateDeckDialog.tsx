"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const levels = ["Beginner", "Intermediate", "Advanced"];

export function CreateDeckDialog() {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState<string[]>(["Beginner"]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title =
      new FormData(event.currentTarget).get("title")?.toString() || "New deck";
    setOpen(false);
    toast.success(`Deck "${title}" created`, {
      description: "This is a UI demo, so nothing was saved.",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="lg" className="h-10" />}>
        <Plus data-icon="inline-start" />
        New deck
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-display">
              Create a new deck
            </DialogTitle>
            <DialogDescription>
              Group words by topic so every study session stays focused.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-6">
            <Field>
              <FieldLabel htmlFor="deck-title">Deck name</FieldLabel>
              <Input
                id="deck-title"
                name="title"
                placeholder="e.g. Travel &amp; Airport"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="deck-description">Description</FieldLabel>
              <Textarea
                id="deck-description"
                name="description"
                rows={3}
                placeholder="What kind of words will live in this deck?"
              />
              <FieldDescription>
                Optional, but future-you will thank you.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel>Level</FieldLabel>
              <ToggleGroup
                value={level}
                onValueChange={setLevel}
                variant="outline"
                className="w-full"
              >
                {levels.map((item) => (
                  <ToggleGroupItem key={item} value={item} className="flex-1">
                    {item}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose
              render={<Button variant="ghost" size="lg" type="button" />}
            >
              Cancel
            </DialogClose>
            <Button type="submit" size="lg">
              Create deck
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
