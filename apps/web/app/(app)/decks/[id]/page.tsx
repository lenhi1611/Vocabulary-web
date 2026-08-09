import type { Metadata } from 'next'
import DeckDetailPage from '@/features/deck/container/DeckDetailPage'

export const metadata: Metadata = {
  title: 'Deck — Lexi',
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <DeckDetailPage deckId={id} />
}
