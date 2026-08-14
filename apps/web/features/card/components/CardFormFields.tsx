import { TextField } from "@/shared/components/form/TextField";
import type { CreateCardFormData } from "@/features/card/schemas/card.schema";

/** The Word / IPA / Meaning / Example fields shared by add-word and edit-word forms. */
export function CardFormFields({
  wordHelperText,
}: {
  wordHelperText?: string;
} = {}) {
  return (
    <>
      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <TextField<CreateCardFormData>
          name="word"
          label="Word"
          placeholder="e.g. resilient"
          helperText={wordHelperText}
        />
        <TextField<CreateCardFormData>
          name="phonetic"
          label="IPA"
          placeholder="/rɪˈzɪliənt/"
        />
      </div>

      <TextField<CreateCardFormData>
        name="meaningVi"
        label="Meaning (Vietnamese)"
        type="textarea"
        className="mb-5"
      />

      <TextField<CreateCardFormData>
        name="meaningEn"
        label="Meaning (English)"
        placeholder="Type the English definition..."
        type="textarea"
        className="mb-5"
      />

      <TextField<CreateCardFormData>
        name="example"
        label="Example sentence"
        placeholder="Write an example in context..."
        type="textarea"
        className="mb-2"
      />
    </>
  );
}
