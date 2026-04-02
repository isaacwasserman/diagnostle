import { useState, useCallback, useMemo } from "react";
import type { GameState, DiseaseProfile } from "@/data/types";
import { createGame, orderTest, makeGuess, getAvailableTests } from "@/game/engine";
import { dateSeed, todayDateStr } from "@/game/daily";
import { MAX_TURNS } from "@/game/scoring";

export function useGame(allDiseases: readonly DiseaseProfile[]) {
  const dateStr = useMemo(() => todayDateStr(), []);
  const seedNum = useMemo(() => dateSeed(dateStr), [dateStr]);

  const diseaseMap = useMemo(
    () => new Map(allDiseases.map((d) => [d.id, d])),
    [allDiseases]
  );

  const [state, setState] = useState<GameState>(() =>
    createGame(dateStr, allDiseases)
  );

  const targetDisease = useMemo(
    () => diseaseMap.get(state.diseaseId)!,
    [diseaseMap, state.diseaseId]
  );

  const availableTests = useMemo(
    () => getAvailableTests(state),
    [state]
  );

  const handleOrderTest = useCallback(
    (testId: string) => {
      setState((prev) => orderTest(prev, testId, targetDisease, seedNum));
    },
    [targetDisease, seedNum]
  );

  const handleGuess = useCallback(
    (guessId: string) => {
      const guessedDisease = diseaseMap.get(guessId);
      const guessName = guessedDisease?.name ?? guessId;
      setState((prev) => makeGuess(prev, guessId, guessName, targetDisease, guessedDisease));
    },
    [diseaseMap, targetDisease]
  );

  const turnsRemaining = MAX_TURNS - state.turns.length;

  return {
    state,
    targetDisease,
    availableTests,
    allDiseases,
    turnsRemaining,
    handleOrderTest,
    handleGuess,
  };
}
