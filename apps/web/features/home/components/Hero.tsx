import Link from "next/link";
import { ArrowRight, Flame, Gamepad2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/shared/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/shared/components/motion/Stagger";
import { HeroIllustration } from "./hero-illustration/HeroIllustration";

const stats = [
  { value: "12k+", label: "Learners studying daily" },
  { value: "480k", label: "Cards reviewed this month" },
  { value: "92%", label: "Average recall accuracy" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="dotted-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <Stagger className="flex flex-col items-start gap-6" stagger={0.12}>
          <StaggerItem variant="fade-down">
            <Badge variant="secondary" className="h-7 px-3">
              <Sparkles data-icon="inline-start" />
              New: streak challenges with friends
            </Badge>
          </StaggerItem>

          <StaggerItem>
            <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Learn English words you{" "}
              <span className="relative inline-block">
                <span className="relative z-10">actually</span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-full bg-accent" />
              </span>{" "}
              remember.
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Build your own vocabulary decks, flip through smart flashcards,
              and lock the words in with quick review games. Five minutes a day
              is all it takes.
            </p>
          </StaggerItem>

          <StaggerItem className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-11 px-5 text-base"
              render={<Link href="/signup" />}
            >
              Start learning free
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-5 text-base"
              render={<Link href="/demo" />}
            >
              <Gamepad2 data-icon="inline-start" />
              Try the game
            </Button>
          </StaggerItem>

          <StaggerItem className="w-full">
            <dl className="mt-2 grid w-full grid-cols-3 gap-4 border-t border-border pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="font-display text-2xl font-semibold">
                    {stat.value}
                  </dt>
                  <dd className="text-xs leading-relaxed text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </StaggerItem>
        </Stagger>

        <Reveal variant="fade-left" delay={0.15} className="relative">
          <HeroIllustration />

          <Reveal
            variant="scale-in"
            delay={0.55}
            className="absolute -left-4 sm:-left-6"
          >
            <div className="animate-float-soft flex items-center gap-2 rounded-2xl bg-card px-3 py-2 shadow-lg ring-1 ring-foreground/10">
              <span className="flex size-8 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Flame className="size-4" />
              </span>
              <div className="flex flex-col">
                <span className="font-display text-sm font-semibold">
                  12-day streak
                </span>
                <span className="text-xs text-muted-foreground">
                  Keep it up!
                </span>
              </div>
            </div>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}
