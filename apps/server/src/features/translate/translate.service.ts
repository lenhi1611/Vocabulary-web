import { AppError } from "@/lib/error";

type DeepLResponse = {
  translations?: { text: string }[];
};

export const translateService = {
  async translate(text: string): Promise<string> {
    if (!text?.trim())
      throw new AppError("Text is required", 400, "TEXT_REQUIRED");

    const res = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: [text.trim()],
        source_lang: "EN",
        target_lang: "VI",
      }),
    });

    if (!res.ok) {
      throw new AppError("Translate failed", res.status, "TRANSLATION_FAILED");
    }
    const data = (await res.json()) as DeepLResponse;

    return data.translations?.[0]?.text ?? "";
  },
};
