'use client'

import Link from 'next/link'
import { Brand } from '@/shared/components/brand/Brand'
import { Button } from '@/components/ui/button'
import { selectCurrentUser } from '@/features/auth/store/auth.slice'
import { useAppSelector } from '@/shared/store/hooks'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#game', label: 'Game mode' },
]

export function SiteHeader() {
  const user = useAppSelector(selectCurrentUser)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Brand />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <Button size="lg" render={<Link href="/dashboard">Go to dashboard</Link>} />
          ) : (
            <>
              <Button
                size="lg"
                variant="ghost"
                render={<Link href="/signin">Sign in</Link>}
              />
              <Button size="lg" render={<Link href="/signup">Get started</Link>} />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
