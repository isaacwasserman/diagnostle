// Mulberry32 PRNG — deterministic, seedable
export function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Days since Unix epoch — same value for same UTC date worldwide
export function dateSeed(dateStr: string): number {
  const d = new Date(`${dateStr}T00:00:00Z`)
  return Math.floor(d.getTime() / 86400000)
}

// Get today's date as YYYY-MM-DD
export function todayDateStr(): string {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

// Seeded shuffle (Fisher-Yates)
export function seededShuffle<T>(arr: readonly T[], rng: () => number): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[result[i]!, result[j]!] = [result[j]!, result[i]!]
  }
  return result
}
