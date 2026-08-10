export type DeckLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED"

// ===== PAGINATION =====
export type OffsetPagination = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export type CursorPagination = {
  nextCursor: string | null
  hasNext: boolean
  limit: number
}

// ===== API RESPONSE =====
export type ApiSuccess<T> = {
  success: true
  data: T
  message?: string
}

export type ApiError = {
  success: false
  error: {
    message: string
    code?: string
  }
}

// ===== DECK =====
export type Deck = {
  id: string
  name: string
  description: string | null
  level: DeckLevel
  topic: string | null
  userId: string
  createdAt: string
  updatedAt: string
  _count?: { cards: number }
}

export type CreateDeckInput = {
  name: string
  description?: string
  level?: DeckLevel
  topic?: string
}

export type UpdateDeckInput = Partial<CreateDeckInput>

// ===== CARD =====
export type Card = {
  id: string
  word: string
  phonetic: string | null
  meaning: string
  example: string | null
  deckId: string
  createdAt: string
  updatedAt: string
}

export type CreateCardInput = {
  word: string
  phonetic?: string
  meaning: string
  example?: string
}

export type UpdateCardInput = Partial<CreateCardInput>