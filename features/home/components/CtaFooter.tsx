import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Brand } from '@/shared/components/brand/Brand'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Game mode', href: '#game' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Business English', href: '/decks/business-english' },
      { label: 'IELTS Academic', href: '/decks/ielts-academic' },
      { label: 'Daily Conversation', href: '/decks/daily-conversation' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign in', href: '/signin' },
      { label: 'Create account', href: '/signup' },
    ],
  },
]

export function CtaFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 py-16 text-center lg:py-20">
          <h2 className="max-w-2xl font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            Your next 100 English words start tonight
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Free forever for personal learning. No card required, no ads, just
            you and your decks.
          </p>
          <Button
            size="lg"
            className="h-11 px-5 text-base"
            render={<Link href="/signup" />}
          >
            Create your first deck
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <Separator />

        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Brand />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Flashcards, streaks and games for people learning English one word
              at a time.
            </p>
          </div>

          {footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-3">
              <h3 className="font-display text-sm font-semibold">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator />

        <p className="py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lexi. A UI concept — all data on this site
          is sample data.
        </p>
      </div>
    </footer>
  )
}
