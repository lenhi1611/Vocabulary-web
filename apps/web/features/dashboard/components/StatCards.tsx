import { Clock, Flame, Target, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { currentUser } from "@/lib/mock-data";

const stats = [
  {
    icon: Flame,
    label: "Current streak",
    value: `${currentUser.streak} days`,
    hint: "Best: 21 days",
    tone: "accent" as const,
  },
  {
    icon: Trophy,
    label: "Words mastered",
    value: currentUser.wordsMastered.toString(),
    hint: "+18 this week",
    tone: "primary" as const,
  },
  {
    icon: Target,
    label: "Recall accuracy",
    value: `${currentUser.accuracy}%`,
    hint: "Last 7 sessions",
    tone: "muted" as const,
  },
  {
    icon: Clock,
    label: "Studied today",
    value: `${currentUser.minutesToday} min`,
    hint: "Goal: 20 min",
    tone: "muted" as const,
  },
];

const tones = {
  accent: "bg-accent text-accent-foreground",
  primary: "bg-primary text-primary-foreground",
  muted: "bg-secondary text-secondary-foreground",
};

export function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-3">
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${tones[stat.tone]}`}
            >
              <stat.icon className="size-5" />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-xs text-muted-foreground">
                {stat.label}
              </span>
              <span className="font-display text-xl leading-tight font-semibold">
                {stat.value}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {stat.hint}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
