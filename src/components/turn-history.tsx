import type { Turn } from "@/data/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestResultCard } from "./test-result-card";
import { GuessResultCard } from "./guess-result-card";

interface Props {
  turns: Turn[];
}

export function TurnHistory({ turns }: Props) {
  if (turns.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        Run a test or make a guess to begin.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-20rem)] min-h-48 max-h-[600px] pr-2">
      <div className="space-y-2">
        {turns.map((turn, i) => (
          <div key={i}>
            {turn.type === "test" ? (
              <TestResultCard result={turn.result} />
            ) : (
              <GuessResultCard
                guess={turn.guess}
                correct={turn.correct}
                feedback={turn.feedback}
              />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
