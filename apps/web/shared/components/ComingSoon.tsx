import { Construction } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <Empty className="rounded-xl bg-secondary/50">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Construction />
          </EmptyMedia>
          <EmptyTitle className="font-display">{title}</EmptyTitle>
          <EmptyDescription>
            {description ?? "This feature is on its way — check back soon."}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
