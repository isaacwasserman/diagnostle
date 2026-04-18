import { testMap, tests } from "@/data/tests"
import type {
  AbnormalSpec,
  DiagnosticTest,
  DiseaseProfile,
  GameState,
  GuessFeedback,
  ResolvedTestResult,
  Turn,
} from "@/data/types"
import { dateSeed, mulberry32 } from "./daily"
import { MAX_TURNS } from "./scoring"

// ---- Resolve a test result for a given disease ----

function resolveTestValue(
  abnormal: AbnormalSpec,
  rng: () => number,
): number | string {
  if ("value" in abnormal) return abnormal.value
  const [min, max] = abnormal.range
  return +(min + rng() * (max - min)).toFixed(2)
}

function resolveNormalValue(
  test: DiagnosticTest,
  rng: () => number,
): number | string {
  if (test.resultType === "categorical") return test.normalValue
  const { low, high } = test.normalRange
  return +(low + rng() * (high - low)).toFixed(2)
}

// Hash string to number for sub-seeding
function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return h
}

export function runTest(
  disease: DiseaseProfile,
  testId: string,
  dateSeedNum: number,
): ResolvedTestResult {
  const test = testMap.get(testId)
  if (!test) throw new Error(`Unknown test: ${testId}`)

  // Deterministic sub-seed per disease+test combo
  const subSeed = dateSeedNum ^ hashStr(`${disease.id}:${testId}`)
  const rng = mulberry32(subSeed)

  const abnormalSpec = disease.abnormals.get(testId)

  if (abnormalSpec) {
    const value = resolveTestValue(abnormalSpec, rng)
    return {
      testId,
      testName: test.name,
      category: test.category,
      value,
      unit: test.resultType === "numeric" ? test.unit : undefined,
      abnormal: true,
      normalRange: test.resultType === "numeric" ? test.normalRange : undefined,
    }
  }

  const value = resolveNormalValue(test, rng)
  return {
    testId,
    testName: test.name,
    category: test.category,
    value,
    unit: test.resultType === "numeric" ? test.unit : undefined,
    abnormal: false,
    normalRange: test.resultType === "numeric" ? test.normalRange : undefined,
  }
}

// ---- Create a new game for a given date ----

export function createGame(
  dateStr: string,
  allDiseases: readonly DiseaseProfile[],
): GameState {
  const seed = dateSeed(dateStr)
  const rng = mulberry32(seed)

  // Pick a disease deterministically
  const idx = Math.floor(rng() * allDiseases.length)
  const disease = allDiseases[idx]!

  // Pick a chief complaint
  const complaintIdx = Math.floor(rng() * disease.chiefComplaints.length)
  const complaint = disease.chiefComplaints[complaintIdx]!

  return {
    date: dateStr,
    diseaseId: disease.id,
    chiefComplaint: complaint,
    turns: [],
    status: "playing",
    maxTurns: MAX_TURNS,
  }
}

// ---- Process a test order ----

export function orderTest(
  state: GameState,
  testId: string,
  disease: DiseaseProfile,
  dateSeedNum: number,
): GameState {
  if (state.status !== "playing") return state
  if (state.turns.length >= state.maxTurns) return state

  // Don't allow re-running a test
  const alreadyRun = state.turns.some(
    (t) => t.type === "test" && t.result.testId === testId,
  )
  if (alreadyRun) return state

  const result = runTest(disease, testId, dateSeedNum)
  const turn: Turn = { type: "test", result }

  const newTurns = [...state.turns, turn]
  const status = newTurns.length >= state.maxTurns ? "lost" : "playing"

  return { ...state, turns: newTurns, status }
}

// ---- Process a guess ----

export function makeGuess(
  state: GameState,
  guessId: string,
  guessName: string,
  targetDisease: DiseaseProfile,
  guessedDisease: DiseaseProfile | undefined,
): GameState {
  if (state.status !== "playing") return state
  if (state.turns.length >= state.maxTurns) return state

  const correct = guessId === targetDisease.id

  const feedback: GuessFeedback = {
    organSystemMatch: guessedDisease
      ? guessedDisease.organSystem === targetDisease.organSystem
      : false,
    severityMatch: guessedDisease
      ? guessedDisease.severity === targetDisease.severity
      : false,
    sharedAbnormalCount: guessedDisease
      ? countSharedAbnormals(guessedDisease, targetDisease)
      : 0,
  }

  const turn: Turn = {
    type: "guess",
    guess: guessName,
    correct,
    feedback,
  }

  const newTurns = [...state.turns, turn]

  let status: GameState["status"] = state.status
  if (correct) {
    status = "won"
  } else if (newTurns.length >= state.maxTurns) {
    status = "lost"
  }

  return { ...state, turns: newTurns, status }
}

function countSharedAbnormals(a: DiseaseProfile, b: DiseaseProfile): number {
  let count = 0
  for (const key of a.abnormals.keys()) {
    if (b.abnormals.has(key)) count++
  }
  return count
}

// ---- Get tests not yet run ----

export function getAvailableTests(state: GameState) {
  const runTestIds = new Set(
    state.turns
      .filter((t): t is Extract<Turn, { type: "test" }> => t.type === "test")
      .map((t) => t.result.testId),
  )
  return tests.filter((t) => !runTestIds.has(t.id))
}
