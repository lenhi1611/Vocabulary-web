import { Rating } from "@/lib/sm2"

export type StudySessionResult = {
    reviewed: number,
    remembered: number,
    needsWork: number,
    accuracy: number
}

export type SubmitReviewInput = {
    cardId: string,
    rating: Rating,
    userId: string
}