import { useState } from "react";
import { toast } from "sonner";
import type { GameState, DiseaseProfile } from "@/data/types";
import {
  getNarrowingSequence,
  narrowingEmojiLine,
  narrowingShareText,
} from "@/game/narrowing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  state: GameState;
  targetDisease: DiseaseProfile;
  allDiseases: readonly DiseaseProfile[];
}

export function GameOverDialog({ state, targetDisease, allDiseases }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const isOpen =
    !dismissed && (state.status === "won" || state.status === "lost");
  const won = state.status === "won";

  const total = allDiseases.length;
  const sequence = getNarrowingSequence(state.turns, allDiseases);

  const emojiLines = sequence.map((s) => narrowingEmojiLine(s, total));

  const shareText = [
    `Diagnostle — ${state.date}`,
    won
      ? `✅ Diagnosed in ${state.turns.length} turn${state.turns.length !== 1 ? "s" : ""}`
      : `❌ Failed to diagnose`,
    "",
    narrowingShareText(state.turns, allDiseases),
  ].join("\n");

  const handleShare = () => {
    navigator.clipboard.writeText(shareText);
    toast.success("Copied to clipboard");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setDismissed(true);
      }}
    >
      <DialogContent className="sm:max-w-sm gap-0">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-center text-lg">
            {won ? "Diagnosis Complete" : "Out of Turns"}
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground">
            {won ? (
              <>
                You identified
                <br />
                <strong className="text-foreground text-base">
                  {targetDisease.name}
                </strong>
                <br />
                in {state.turns.length} turn
                {state.turns.length !== 1 ? "s" : ""}
              </>
            ) : (
              <>
                The answer was
                <br />
                <strong className="text-foreground text-base">
                  {targetDisease.name}
                </strong>
              </>
            )}
          </p>
        </DialogHeader>

        <div className="border-t pt-4 space-y-3">
          <p className="text-xs text-muted-foreground text-center">
            Diseases ruled out of {total}
          </p>

          <div className="flex justify-center">
            <pre className="text-sm leading-loose whitespace-pre select-all">
{emojiLines.join("\n")}
            </pre>
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full" onClick={handleShare}>
            Copy Results
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
