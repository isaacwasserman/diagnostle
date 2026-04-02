import type { Turn } from "@/data/types";
import { TestResultCard } from "./test-result-card";
import { GuessResultCard } from "./guess-result-card";

interface Props {
  turns: Turn[];
  maxTurns: number;
}

export function TurnHistory({ turns, maxTurns }: Props) {
  const remaining = maxTurns - turns.length;

  if (turns.length === 0) {
    return (
      <p className="text-center py-6 text-sm text-muted-foreground">
        Run a test or guess a diagnosis to begin.
      </p>
    );
  }

  return (
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
      {remaining > 0 && (
        <p className="text-center text-xs text-muted-foreground pt-1">
          {remaining} {remaining === 1 ? "turn" : "turns"} remaining
        </p>
      )}
    </div>
  );
}
