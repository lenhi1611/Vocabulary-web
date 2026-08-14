-- Preserve existing data: rename `meaning` (Vietnamese meaning) instead of
-- dropping and recreating it, then add the new optional English meaning.
ALTER TABLE "Card" RENAME COLUMN "meaning" TO "meaningVi";
ALTER TABLE "Card" ADD COLUMN "meaningEn" TEXT;
