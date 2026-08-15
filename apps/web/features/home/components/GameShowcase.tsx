import Link from "next/link";
import { Check, Flame, Timer, Trophy, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Reveal } from "@/shared/components/motion/Reveal";

const answers = [
  { label: "giảm thiểu", state: "correct" as const },
  { label: "phóng đại", state: "idle" as const },
  { label: "trì hoãn", state: "wrong" as const },
  { label: "thay thế", state: "idle" as const },
];

export function GameShowcase() {
  return (
    <section
      id="game"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal
          variant="fade-right"
          className="flex flex-col items-start gap-5"
        >
          <Badge variant="outline" className="w-fit">
            Game mode
          </Badge>
          <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            Revision that feels like a round, not a chore
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Pick the right meaning before the timer runs out. Every correct
            answer builds your combo multiplier; every miss sends the card back
            into the pile.
          </p>

          <ul className="flex flex-col gap-3">
            {[
              { icon: Timer, text: "10 seconds per card to keep recall sharp" },
              { icon: Flame, text: "Combo streaks multiply the XP you earn" },
              {
                icon: Trophy,
                text: "Weekly leaderboard with your study group",
              },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-sm">
                <span className="flex size-8 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                  <item.icon className="size-4" />
                </span>
                <span className="leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            className="h-11 px-5 text-base"
            render={<Link href="/demo" />}
          >
            Play a demo round
          </Button>
        </Reveal>

        <Reveal variant="fade-left" delay={0.1}>
          <Card className="bg-card">
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Question 4 of 10</Badge>
                <span className="flex items-center gap-1.5 font-display text-sm font-semibold">
                  <Timer className="size-4 text-muted-foreground" />
                  07s
                </span>
              </div>

              <Progress
                value={40}
                className="[&_[data-slot=progress-track]]:h-2"
              />

              <div className="rounded-2xl bg-secondary/70 px-4 py-8 text-center">
                <p className="font-display text-3xl font-semibold tracking-tight">
                  mitigate
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  /ˈmɪtɪɡeɪt/ · verb
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {answers.map((answer) => (
                  <div
                    key={answer.label}
                    className={
                      answer.state === "correct"
                        ? "flex items-center justify-between gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground"
                        : answer.state === "wrong"
                          ? "flex items-center justify-between gap-2 rounded-xl bg-destructive/10 px-3 py-2.5 text-sm font-medium text-destructive"
                          : "flex items-center justify-between gap-2 rounded-xl bg-muted px-3 py-2.5 text-sm font-medium text-muted-foreground"
                    }
                  >
                    {answer.label}
                    {answer.state === "correct" && <Check className="size-4" />}
                    {answer.state === "wrong" && <X className="size-4" />}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between rounded-xl bg-accent px-3 py-2.5 text-sm font-medium text-accent-foreground">
                <span className="flex items-center gap-1.5">
                  <Flame className="size-4" />
                  Combo x3
                </span>
                <span className="font-display font-semibold">+120 XP</span>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
