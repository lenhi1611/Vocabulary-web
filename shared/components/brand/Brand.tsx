import Link from 'next/link'
import { Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Brand({
  href = '/',
  className,
}: {
  href?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn('inline-flex items-center gap-2 font-display', className)}
    >
      <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Layers className="size-4" />
      </span>
      <span className="text-lg font-semibold tracking-tight">Lexi</span>
    </Link>
  )
}
