import type { DiseaseProfile } from "@/data/types";
import { useGame } from "@/hooks/use-game";
import { ChiefComplaintBanner } from "./chief-complaint-banner";
import { TurnHistory } from "./turn-history";
import { ActionPanel } from "./action-panel";
import { GameOverDialog } from "./game-over-dialog";

interface Props {
  diseases: readonly DiseaseProfile[];
}

export function GameBoard({ diseases }: Props) {
  const {
    state,
    targetDisease,
    availableTests,
    allDiseases,
    turnsRemaining,
    handleOrderTest,
    handleGuess,
  } = useGame(diseases);

  const gameOver = state.status !== "playing";

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <ChiefComplaintBanner
        complaint={state.chiefComplaint}
        turnsRemaining={turnsRemaining}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
            History
          </h2>
          <TurnHistory turns={state.turns} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
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
      </div>

      <GameOverDialog state={state} targetDisease={targetDisease} />
    </div>
  );
}
