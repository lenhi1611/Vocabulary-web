import type { Metadata } from 'next'
import { StudySessionPage } from '@/features/study/container/StudySessionPage'

export const metadata: Metadata = {
  title: 'Study — Lexi',
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <StudySessionPage deckId={id} />
    </div>
  )
}
