import { describe, expect, it } from "vitest"
import { dateSeed, mulberry32, seededShuffle } from "@/game/daily"

describe("mulberry32", () => {
  it("produces deterministic output for the same seed", () => {
    const rng1 = mulberry32(42)
    const rng2 = mulberry32(42)
    expect(rng1()).toBe(rng2())
    expect(rng1()).toBe(rng2())
  })

  it("produces different output for different seeds", () => {
    const rng1 = mulberry32(1)
    const rng2 = mulberry32(2)
    expect(rng1()).not.toBe(rng2())
  })

  it("produces values between 0 and 1", () => {
    const rng = mulberry32(123)
    for (let i = 0; i < 100; i++) {
      const v = rng()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })
})

describe("dateSeed", () => {
  it("returns same seed for same date", () => {
    expect(dateSeed("2026-04-02")).toBe(dateSeed("2026-04-02"))
  })

  it("returns different seeds for different dates", () => {
    expect(dateSeed("2026-04-02")).not.toBe(dateSeed("2026-04-03"))
  })
})

describe("seededShuffle", () => {
  it("returns same order for same seed", () => {
    const arr = [1, 2, 3, 4, 5]
    const a = seededShuffle(arr, mulberry32(42))
    const b = seededShuffle(arr, mulberry32(42))
    expect(a).toEqual(b)
  })

  it("does not modify the original array", () => {
    const arr = [1, 2, 3, 4, 5]
    seededShuffle(arr, mulberry32(1))
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})
