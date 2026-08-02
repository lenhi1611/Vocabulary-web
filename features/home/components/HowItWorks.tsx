import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/shared/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/shared/components/motion/Stagger";

const steps = [
  {
    step: "01",
    title: "Create a deck",
    description:
      "Name it, pick a level, and give it a colour. Business English, IELTS, travel talk — your call.",
  },
  {
    step: "02",
    title: "Fill it with words",
    description:
      "Add the term, its meaning, your own translation and an example sentence you like.",
  },
  {
    step: "03",
    title: "Study the cards",
    description:
      "Flip, rate how well you knew it, and let the schedule decide what comes back tomorrow.",
  },
  {
    step: "04",
    title: "Play to prove it",
    description:
      "Finish with a timed game round. Combos, XP and a fresh streak day are the reward.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border bg-secondary/50"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="flex max-w-2xl flex-col gap-4">
          <Badge variant="outline" className="w-fit bg-background">
            How it works
          </Badge>
          <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            Four small steps, repeated daily
          </h2>
        </Reveal>

        <Stagger>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <li key={item.step}>
                <StaggerItem variant="scale-in" className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <span className="font-display text-sm font-semibold text-primary">
                        {item.step}
                      </span>
                      <CardTitle className="font-display text-lg">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </CardContent>
                  </Card>
                </StaggerItem>
              </li>
            ))}
          </ol>
        </Stagger>
      </div>
    </section>
  );
}
