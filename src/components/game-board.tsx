import type { DiseaseProfile } from "@/data/types"
import { useGame } from "@/hooks/use-game"
import { ActionPanel } from "./action-panel"
import { ChiefComplaintBanner } from "./chief-complaint-banner"
import { GameOverDialog } from "./game-over-dialog"
import { TurnHistory } from "./turn-history"

interface Props {
  diseases: readonly DiseaseProfile[]
  dateStr: string
}

export function GameBoard({ diseases, dateStr }: Props) {
  const {
    state,
    targetDisease,
    availableTests,
    allDiseases,
    handleOrderTest,
    handleGuess,
  } = useGame(diseases, dateStr)

  const gameOver = state.status !== "playing"

  return (
    <div className="mx-auto max-w-4xl px-4 py-4 space-y-4">
      <ChiefComplaintBanner
        complaint={state.chiefComplaint}
        dateStr={dateStr}
      />

      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          History
        </h2>
        <TurnHistory turns={state.turns} maxTurns={state.maxTurns} />
      </div>

      <div>
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

      <GameOverDialog
        state={state}
        targetDisease={targetDisease}
        allDiseases={allDiseases}
      />
    </div>
  )
}
