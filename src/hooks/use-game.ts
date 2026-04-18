import { useCallback, useEffect, useMemo, useState } from "react"
import type { DiseaseProfile, GameState } from "@/data/types"
import { dateSeed } from "@/game/daily"
import {
  createGame,
  getAvailableTests,
  makeGuess,
  orderTest,
} from "@/game/engine"
import { MAX_TURNS } from "@/game/scoring"

export function useGame(
  allDiseases: readonly DiseaseProfile[],
  dateStr: string,
) {
  const seedNum = useMemo(() => dateSeed(dateStr), [dateStr])

  const diseaseMap = useMemo(
    () => new Map(allDiseases.map((d) => [d.id, d])),
    [allDiseases],
  )

  const [state, setState] = useState<GameState>(() =>
    createGame(dateStr, allDiseases),
  )

  // Reset game when date changes
  useEffect(() => {
    setState(createGame(dateStr, allDiseases))
  }, [dateStr, allDiseases])

  const targetDisease = useMemo(
    () => diseaseMap.get(state.diseaseId)!,
    [diseaseMap, state.diseaseId],
  )

  const availableTests = useMemo(() => getAvailableTests(state), [state])

  const handleOrderTest = useCallback(
    (testId: string) => {
      setState((prev) => orderTest(prev, testId, targetDisease, seedNum))
    },
    [targetDisease, seedNum],
  )

  const handleGuess = useCallback(
    (guessId: string) => {
      const guessedDisease = diseaseMap.get(guessId)
      const guessName = guessedDisease?.name ?? guessId
      setState((prev) =>
        makeGuess(prev, guessId, guessName, targetDisease, guessedDisease),
      )
    },
    [diseaseMap, targetDisease],
  )

  const turnsRemaining = MAX_TURNS - state.turns.length

  return {
    state,
    targetDisease,
    availableTests,
    allDiseases,
    turnsRemaining,
    handleOrderTest,
    handleGuess,
  }
}
