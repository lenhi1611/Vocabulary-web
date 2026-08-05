import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { CreateDeckDialog } from "../components/CreateDeckDialog";
import { DeckCard } from "../components/DeckCard";
import { ProgressPanel } from "../components/ProgressPanel";
import { StatCards } from "../components/StatCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { currentUser, decks } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Dashboard — Lexi",
  description: "Your decks, streak and daily review queue.",
};

export default function DashboardPage() {
  const dueTotal = decks.reduce((total, deck) => total + deck.dueToday, 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              Hi {currentUser.name.split(" ")[0]}, ready for a round?
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              You have {dueTotal} cards waiting across {decks.length} decks.
            </p>
          </div>
          <CreateDeckDialog />
        </div>

        <StatCards />

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
                <Flame className="size-5" />
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="font-display text-lg font-semibold">
                  Keep your {currentUser.streak}-day streak alive
                </p>
                <p className="text-sm text-primary-foreground/80">
                  A 5-minute session is enough to check today off.
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="h-10 shrink-0"
              render={<Link href="/decks/ielts-academic/study" />}
            >
              Start today&apos;s review
              <ArrowRight data-icon="inline-end" />
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Your decks
              </h2>
              <span className="text-sm text-muted-foreground">
                {decks.length} decks
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {decks.map((deck) => (
                <DeckCard key={deck.id} deck={deck} />
              ))}
            </div>
          </section>

          <aside className="flex flex-col gap-4">
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Your progress
            </h2>
            <ProgressPanel />
          </aside>
        </div>
      </div>
    </div>
  );
}
