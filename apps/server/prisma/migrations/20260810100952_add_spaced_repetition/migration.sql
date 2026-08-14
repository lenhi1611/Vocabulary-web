-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "ease" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
ADD COLUMN     "interval" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "nextReview" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "repetitions" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "CardReview" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CardReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CardReview_cardId_idx" ON "CardReview"("cardId");

-- CreateIndex
CREATE INDEX "Card_nextReview_idx" ON "Card"("nextReview");

-- AddForeignKey
ALTER TABLE "CardReview" ADD CONSTRAINT "CardReview_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
