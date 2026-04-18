import type { GameState, Turn } from "@/data/types"

const STATE_PREFIX = "diagnostle-state-"
const STATS_KEY = "diagnostle-stats"

export interface GameStats {
  gamesPlayed: number
  gamesWon: number
  currentStreak: number
  maxStreak: number
  turnDistribution: Record<number, number> // turns -> count
}

const defaultStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  turnDistribution: {},
}

// ---- Game State ----

interface SavedGameState {
  date: string
  diseaseId: string
  chiefComplaint: string
  turns: Turn[]
  status: "playing" | "won" | "lost"
  maxTurns: number
}

export function saveGameState(state: GameState): void {
  const saved: SavedGameState = {
    date: state.date,
    diseaseId: state.diseaseId,
    chiefComplaint: state.chiefComplaint,
    turns: state.turns,
    status: state.status,
    maxTurns: state.maxTurns,
  }
  localStorage.setItem(STATE_PREFIX + state.date, JSON.stringify(saved))
}

export function loadGameState(date: string): SavedGameState | null {
  const raw = localStorage.getItem(STATE_PREFIX + date)
  if (!raw) return null
  return JSON.parse(raw) as SavedGameState
}

// ---- Stats ----

export function loadStats(): GameStats {
  const raw = localStorage.getItem(STATS_KEY)
  if (!raw) return { ...defaultStats }
  return JSON.parse(raw) as GameStats
}

export function saveStats(stats: GameStats): void {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats))
}

export function recordGameResult(won: boolean, turns: number): GameStats {
  const stats = loadStats()
  stats.gamesPlayed++
  if (won) {
    stats.gamesWon++
    stats.currentStreak++
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak)
    stats.turnDistribution[turns] = (stats.turnDistribution[turns] ?? 0) + 1
  } else {
    stats.currentStreak = 0
  }
  saveStats(stats)
  return stats
}
