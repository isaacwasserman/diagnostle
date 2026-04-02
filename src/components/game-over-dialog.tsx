import type { GameState, DiseaseProfile } from "@/data/types";
import { getStarRating } from "@/game/scoring";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  state: GameState;
  targetDisease: DiseaseProfile;
}

export function GameOverDialog({ state, targetDisease }: Props) {
  const isOpen = state.status === "won" || state.status === "lost";
  const won = state.status === "won";
  const stars = won ? getStarRating(state.turns.length) : 0;

  const testCount = state.turns.filter((t) => t.type === "test").length;
  const guessCount = state.turns.filter((t) => t.type === "guess").length;

  const shareText = won
    ? `Diagnostle ${state.date}\nChief complaint: "${state.chiefComplaint}"\nDiagnosed in ${state.turns.length} turns (${testCount} tests, ${guessCount} guesses)\n${"⭐".repeat(stars)}`
    : `Diagnostle ${state.date}\nChief complaint: "${state.chiefComplaint}"\nFailed to diagnose in ${state.turns.length} turns`;

  const handleShare = () => {
    navigator.clipboard.writeText(shareText);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className={won ? "text-green-700" : "text-red-700"}>
            {won ? "Correct Diagnosis!" : "Out of Turns"}
          </DialogTitle>
          <DialogDescription>
            The answer was <strong className="text-foreground">{targetDisease.name}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {won && (
            <div className="text-center">
              <p className="text-3xl">{"⭐".repeat(stars)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {state.turns.length} turn{state.turns.length !== 1 ? "s" : ""} ({testCount} tests, {guessCount} guesses)
              </p>
            </div>
          )}

          {!won && (
            <p className="text-sm text-muted-foreground text-center">
              Better luck tomorrow!
            </p>
          )}

          <Button className="w-full" onClick={handleShare}>
            Copy Results to Clipboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
