"use client";

import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSpeak } from "@/shared/hooks/useSpeak";

type SpeakButtonProps = {
  text: string;
  label?: string;
  size?: "icon-xs" | "icon-sm" | "icon" | "icon-lg";
  /** "ghost" is the compact inline trigger; "filled" is a prominent circular button for hero contexts like the study card. */
  variant?: "ghost" | "filled";
  className?: string;
};

/** Icon button that reads `text` aloud via the browser's speech synthesis. */
export function SpeakButton({
  text,
  label,
  size = "icon-sm",
  variant = "ghost",
  className,
}: SpeakButtonProps) {
  const { speak, isSpeaking } = useSpeak();
  const value = text.trim();

  if (!value) return null;

  const speaking = isSpeaking(value);

  return (
    <Button
      type="button"
      variant={variant === "filled" ? "secondary" : "ghost"}
      size={size}
      className={cn(
        variant === "filled" ? "rounded-full" : "text-muted-foreground",
        className,
      )}
      aria-label={label ?? `Pronounce "${value}"`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        speak(value);
      }}
    >
      <Volume2 className={cn(speaking && "animate-pulse text-primary")} />
    </Button>
  );
}
