"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "@/shared/components/brand/Brand";
import { Reveal } from "@/shared/components/motion/Reveal";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      <div className="dotted-grid pointer-events-none absolute inset-0 opacity-40" />

      <Reveal className="relative flex flex-col items-center gap-6">
        <Brand />

        <div className="flex flex-col items-center gap-3">
          <p className="font-display text-7xl font-semibold tracking-tight text-primary sm:text-8xl">
            404
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            This page wandered off the deck
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>

        <Button
          size="lg"
          className="h-11 px-5 text-base"
          onClick={() => router.back()}
        >
          <ArrowLeft data-icon="inline-start" />
          Go back
        </Button>
      </Reveal>
    </main>
  );
}
