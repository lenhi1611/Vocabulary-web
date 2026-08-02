"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Flame, Sparkles, Trophy } from 'lucide-react'
import { Brand } from '@/shared/components/brand/Brand'

const highlights = [
  {
    icon: Sparkles,
    title: 'Smart flashcards',
    text: 'Cards adapt to what you keep forgetting.',
  },
  {
    icon: Flame,
    title: 'Daily streaks',
    text: 'Five focused minutes beats a two-hour cram.',
  },
  {
    icon: Trophy,
    title: 'Review games',
    text: 'Prove you own a word before it leaves the deck.',
  },
]

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isSignUpPage = pathname === '/signup'

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <main className="flex flex-col px-4 py-8 sm:px-8">
        <Brand />
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          {isSignUpPage ? (
            <>
              Already have an account?{' '}
              <Link href="/signin" className="font-medium text-foreground underline underline-offset-4">
                Sign in
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-foreground underline underline-offset-4">
                Sign up
              </Link>
            </>
          )}
        </p>
      </main>

      <aside className="relative hidden overflow-hidden border-l border-border bg-secondary/60 lg:flex lg:flex-col lg:justify-center">
        <div className="dotted-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative flex flex-col gap-10 px-12">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-md font-display text-3xl leading-tight font-semibold tracking-tight text-balance">
              Join 12,000 learners building their English word by word
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Create decks, study with flashcards, and finish every session with
              a quick game round.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-3 rounded-2xl bg-card px-4 py-3 ring-1 ring-foreground/10"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <item.icon className="size-4" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-display text-sm font-semibold">
                    {item.title}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
