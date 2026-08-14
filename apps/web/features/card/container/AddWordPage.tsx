"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormContext as useRHFContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useSidebar } from "@/components/ui/sidebar";
import { Form, SubmitButton } from "@/shared/components/form/Form";
import { SpeakButton } from "@/shared/components/audio/SpeakButton";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import {
  CreateCardFormData,
  createCardSchema,
} from "@/features/card/schemas/card.schema";
import { CardFormFields } from "@/features/card/components/CardFormFields";
import { useWordLookup } from "@/features/card/hooks/useWordLookup";
import { createCard, selectCreateCardLoading } from "../store/card.slice";

const emptyValues: CreateCardFormData = {
  word: "",
  phonetic: "",
  meaningVi: "",
  meaningEn: "",
  example: "",
};

type SubmitIntent = "save" | "save-and-add";

export function AddWordPage({ deckId }: { deckId: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoading = useAppSelector(selectCreateCardLoading);
  const { setOpen, open } = useSidebar();
  const wasOpenRef = useRef(open);
  const [intent, setIntent] = useState<SubmitIntent>("save");
  const resetFormRef = useRef<() => void>(() => {});

  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    setOpen(false);
    return () => setOpen(wasOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(values: CreateCardFormData) {
    try {
      await dispatch(createCard({ deckId, data: values })).unwrap();
      toast.add({
        title: "Word added",
        description: `"${values.word}" has been added to the deck.`,
        type: "success",
      });
      if (intent === "save-and-add") {
        resetFormRef.current();
      } else {
        router.push(`/decks/${deckId}`);
      }
    } catch (error) {
      toast.add({
        title: "Failed to add word",
        description: typeof error === "string" ? error : "Something went wrong",
        type: "error",
      });
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="flex flex-col gap-6">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit text-muted-foreground"
          render={<Link href={`/decks/${deckId}`} />}
        >
          <ChevronLeft data-icon="inline-start" />
          Back to deck
        </Button>

        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Add vocabulary
          </h1>
          <p className="text-sm text-muted-foreground">
            Add a rich word entry with pronunciation and examples.
          </p>
        </div>

        <Form<CreateCardFormData>
          onSubmit={handleSubmit}
          defaultValues={emptyValues}
          className="grid gap-6 lg:grid-cols-3 lg:items-start"
          options={{
            mode: "onChange",
            resolver: zodResolver(createCardSchema),
          }}
        >
          <AddWordFormBody
            isLoading={isLoading}
            intent={intent}
            onIntentChange={setIntent}
            resetFormRef={resetFormRef}
          />
        </Form>
      </div>
    </div>
  );
}

function AddWordFormBody({
  isLoading,
  intent,
  onIntentChange,
  resetFormRef,
}: {
  isLoading: boolean;
  intent: SubmitIntent;
  onIntentChange: (intent: SubmitIntent) => void;
  resetFormRef: React.RefObject<() => void>;
}) {
  const { watch, reset, setFocus, setValue, getValues } =
    useRHFContext<CreateCardFormData>();
  const preview = watch();
  const {
    suggestion,
    isLoading: isLookingUp,
    lookup,
    clearSuggestion,
  } = useWordLookup();

  useEffect(() => {
    resetFormRef.current = () => {
      reset(emptyValues);
      clearSuggestion();
      setFocus("word");
    };
  }, [reset, setFocus, resetFormRef, clearSuggestion]);

  useEffect(() => {
    lookup(preview.word ?? "");
  }, [preview.word, lookup]);

  // Only fill fields the user hasn't already typed into — never clobber
  // manual edits with a dictionary suggestion that arrives later.
  useEffect(() => {
    if (!suggestion) return;
    const current = getValues();
    if (suggestion.phonetic) {
      setValue("phonetic", suggestion.phonetic, { shouldDirty: true });
    }
    if ( suggestion.meaningVi) {
      setValue("meaningVi", suggestion.meaningVi, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    if (suggestion.meaningEn) {
      setValue("meaningEn", suggestion.meaningEn, { shouldDirty: true });
    }
  }, [suggestion, getValues, setValue]);

  return (
    <>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-display text-lg">
            Word information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardFormFields
            wordHelperText={isLookingUp ? "Đang tra từ điển..." : undefined}
          />

          <div className="flex flex-wrap items-center justify-end gap-2">
            <SubmitButton
              type="submit"
              variant="outline"
              size="lg"
              className="w-fit"
              isLoading={isLoading && intent === "save-and-add"}
              onClick={() => onIntentChange("save-and-add")}
            >
              Save & add another
            </SubmitButton>
            <SubmitButton
              type="submit"
              size="lg"
              className="w-fit"
              isLoading={isLoading && intent === "save"}
              onClick={() => onIntentChange("save")}
            >
              Save word
            </SubmitButton>
          </div>
        </CardContent>
      </Card>

      <Card className="gap-4 bg-foreground text-background lg:sticky lg:top-6">
        <CardHeader>
          <CardTitle className="text-xs font-semibold tracking-widest text-background/60 uppercase">
            Word preview
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="rounded-2xl bg-background p-5 text-foreground">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="font-display text-xl font-semibold wrap-break-word">
                {preview.word?.trim() || "Your word"}
              </p>
              {preview.word?.trim() ? (
                <SpeakButton text={preview.word} size="icon-xs" />
              ) : null}
            </div>
            {preview.phonetic?.trim() ? (
              <p className="mt-1 text-sm text-primary">{preview.phonetic}</p>
            ) : null}
            {preview.meaningVi?.trim() ? (
              <p className="mt-3 text-sm leading-relaxed">
                {preview.meaningVi}
              </p>
            ) : null}
            {preview.meaningEn?.trim() ? (
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {preview.meaningEn}
              </p>
            ) : null}
            {preview.example?.trim() ? (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground italic">
                &ldquo;{preview.example}&rdquo;
              </p>
            ) : null}
          </div>
          <p className="text-xs text-background/60">
            Live preview updates as you type.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
