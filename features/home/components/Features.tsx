import {
  BrainCircuit,
  Gamepad2,
  LayoutGrid,
  LineChart,
  Plus,
  Volume2,
} from 'lucide-react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: LayoutGrid,
    title: 'Your own decks',
    description:
      'Group words by topic, exam or mood. Colour-coded decks keep everything tidy.',
  },
  {
    icon: Plus,
    title: 'Add words in seconds',
    description:
      'Term, meaning, translation and an example sentence — all on one compact form.',
  },
  {
    icon: BrainCircuit,
    title: 'Spaced repetition',
    description:
      'Cards you struggle with come back sooner, mastered ones fade into the background.',
  },
  {
    icon: Gamepad2,
    title: 'Review games',
    description:
      'Beat the clock, build combos and turn revision into something you look forward to.',
  },
  {
    icon: Volume2,
    title: 'Pronunciation',
    description:
      'Every card shows phonetics with audio so your speaking keeps up with your reading.',
  },
  {
    icon: LineChart,
    title: 'Progress you can see',
    description:
      'Streaks, XP and mastery levels show exactly how far you have come this week.',
  },
]

export function Features() {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="flex max-w-2xl flex-col gap-4">
        <Badge variant="outline" className="w-fit">
          Everything you need
        </Badge>
        <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
          A complete vocabulary workflow, minus the busywork
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          From capturing a new word you heard in a podcast to proving you own it
          in a timed game round.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="transition-transform hover:-translate-y-1"
          >
            <CardHeader>
              <span className="mb-2 flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <feature.icon className="size-5" />
              </span>
              <CardTitle className="font-display text-lg">
                {feature.title}
              </CardTitle>
              <CardDescription className="leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
