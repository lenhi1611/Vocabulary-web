import { Check, Lock, Medal, Zap } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  achievements,
  currentUser,
  leaderboard,
  weeklyActivity,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function ProgressPanel() {
  const xpPercent = Math.round(
    (currentUser.xp / currentUser.xpToNextLevel) * 100,
  );

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-display">This week</CardTitle>
          <CardDescription>
            {weeklyActivity.filter((day) => day.done).length} of 7 days studied
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ul className="flex items-end justify-between gap-1">
            {weeklyActivity.map((day) => (
              <li key={day.day} className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-xl text-xs font-medium",
                    day.done
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                  title={day.done ? `${day.cards} cards` : "Not studied yet"}
                >
                  {day.done ? (
                    <Check className="size-4" />
                  ) : (
                    day.day.slice(0, 1)
                  )}
                </span>
                <span className="text-[0.7rem] text-muted-foreground">
                  {day.day}
                </span>
              </li>
            ))}
          </ul>

          <Separator />

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 font-medium">
                <Zap className="size-4 text-muted-foreground" />
                Level {currentUser.level}
              </span>
              <span className="text-muted-foreground">
                {currentUser.xp.toLocaleString("en-US")} /{" "}
                {currentUser.xpToNextLevel.toLocaleString("en-US")} XP
              </span>
            </div>
            <Progress
              value={xpPercent}
              className="[&_[data-slot=progress-track]]:h-2"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Badges</CardTitle>
          <CardDescription>Three unlocked, one to go</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {achievements.map((badge) => (
            <Badge
              key={badge.id}
              variant={badge.unlocked ? "secondary" : "outline"}
              className={cn(
                "h-7 gap-1.5 px-2.5",
                !badge.unlocked && "opacity-60",
              )}
            >
              {badge.unlocked ? <Medal /> : <Lock />}
              {badge.label}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Weekly leaderboard</CardTitle>
          <CardDescription>Your study group of 5</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-1">
            {leaderboard.map((person) => (
              <li
                key={person.rank}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-2 py-1.5",
                  person.isYou && "bg-secondary",
                )}
              >
                <span className="w-4 text-xs font-medium text-muted-foreground">
                  {person.rank}
                </span>
                <Avatar className="size-7">
                  <AvatarFallback className="text-xs">
                    {person.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate text-sm font-medium">
                  {person.name}
                  {person.isYou && (
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                      you
                    </span>
                  )}
                </span>
                <span className="text-sm text-muted-foreground">
                  {person.xp.toLocaleString("en-US")}
                </span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
