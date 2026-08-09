import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { StudySessionStats } from "@/features/study/hooks/useStudySession";

function StatRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: number;
  valueClassName?: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn("font-display text-2xl font-bold", valueClassName)}>
        {value}
      </p>
    </div>
  );
}

export function SessionStatsPanel({ stats }: { stats: StudySessionStats }) {
  return (
    <Card className="w-full shrink-0 lg:max-w-55">
      <CardHeader>
        <CardTitle className="font-display text-lg">Today</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <StatRow label="Reviewed" value={stats.reviewed} />
        <StatRow
          label="Remembered"
          value={stats.remembered}
          valueClassName="text-primary"
        />
        <StatRow
          label="Needs work"
          value={stats.needsWork}
          valueClassName="text-destructive"
        />
        <div>
          <p className="text-xs text-muted-foreground">Accuracy</p>
          <p className="font-display text-2xl font-bold text-primary">
            {stats.accuracy}%
          </p>
          <Progress value={stats.accuracy} className="mt-2" />
        </div>
      </CardContent>
    </Card>
  );
}
