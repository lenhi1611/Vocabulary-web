import type { Metadata } from 'next'
import { AddWordPage } from '@/features/card/container/AddWordPage'

export const metadata: Metadata = {
  title: 'Add vocabulary — Lexi',
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <AddWordPage deckId={id} />
}
