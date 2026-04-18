import type { DiseaseProfile } from "@/data/types";
import { useGame } from "@/hooks/use-game";
import { ChiefComplaintBanner } from "./chief-complaint-banner";
import { TurnHistory } from "./turn-history";
import { ActionPanel } from "./action-panel";
import { GameOverDialog } from "./game-over-dialog";

interface Props {
  diseases: readonly DiseaseProfile[];
  dateStr: string;
}

export function GameBoard({ diseases, dateStr }: Props) {
  const {
    state,
    targetDisease,
    availableTests,
    allDiseases,
    handleOrderTest,
    handleGuess,
  } = useGame(diseases, dateStr);

  const gameOver = state.status !== "playing";

  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 pb-6 space-y-4 flex-1 w-full flex flex-col min-h-0">
      <ChiefComplaintBanner complaint={state.chiefComplaint} dateStr={dateStr} />

      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          History
        </h2>
        <TurnHistory turns={state.turns} maxTurns={state.maxTurns} />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Actions
        </h2>
        <ActionPanel
          availableTests={availableTests}
          diseases={allDiseases}
          onSelectTest={handleOrderTest}
          onGuess={handleGuess}
          disabled={gameOver}
        />
      </div>

      <GameOverDialog state={state} targetDisease={targetDisease} allDiseases={allDiseases} />
    </div>
  );
}
