import { useState, useCallback, useMemo, useEffect } from "react";
import type { GameState, DiseaseProfile } from "@/data/types";
import { createGame, orderTest, makeGuess, getAvailableTests } from "@/game/engine";
import { dateSeed, todayDateStr } from "@/game/daily";
import { saveGameState, loadGameState, recordGameResult } from "@/game/storage";
import { MAX_TURNS } from "@/game/scoring";

export function useGame(allDiseases: readonly DiseaseProfile[]) {
  const dateStr = useMemo(() => todayDateStr(), []);
  const seedNum = useMemo(() => dateSeed(dateStr), [dateStr]);

  const diseaseMap = useMemo(
    () => new Map(allDiseases.map((d) => [d.id, d])),
    [allDiseases]
  );

  const [state, setState] = useState<GameState>(() => {
    // Try to restore saved state
    const saved = loadGameState(dateStr);
    if (saved) {
      return {
        date: saved.date,
        diseaseId: saved.diseaseId,
        chiefComplaint: saved.chiefComplaint,
        turns: saved.turns,
        status: saved.status,
        maxTurns: saved.maxTurns,
      };
    }
    return createGame(dateStr, allDiseases);
  });

  // Persist state on every change
  useEffect(() => {
    saveGameState(state);
  }, [state]);

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
      setState((prev) => {
        const next = orderTest(prev, testId, targetDisease, seedNum);
        if (next.status === "lost") {
          recordGameResult(false, next.turns.length);
        }
        return next;
      });
    },
    [targetDisease, seedNum]
  );

  const handleGuess = useCallback(
    (guessId: string) => {
      const guessedDisease = diseaseMap.get(guessId);
      const guessName = guessedDisease?.name ?? guessId;
      setState((prev) => {
        const next = makeGuess(prev, guessId, guessName, targetDisease, guessedDisease);
        if (next.status === "won") {
          recordGameResult(true, next.turns.length);
        } else if (next.status === "lost") {
          recordGameResult(false, next.turns.length);
        }
        return next;
      });
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
