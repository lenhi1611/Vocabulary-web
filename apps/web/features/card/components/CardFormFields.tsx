import { TextField } from "@/shared/components/form/TextField";
import type { CreateCardFormData } from "@/features/card/schemas/card.schema";

/** The Word / IPA / Meaning / Example fields shared by add-word and edit-word forms. */
export function CardFormFields() {
  return (
    <>
      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <TextField<CreateCardFormData>
          name="word"
          label="Word"
          placeholder="e.g. resilient"
        />
        <TextField<CreateCardFormData>
          name="phonetic"
          label="IPA"
          placeholder="/rɪˈzɪliənt/"
        />
      </div>

      <TextField<CreateCardFormData>
        name="meaning"
        label="Meaning"
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
