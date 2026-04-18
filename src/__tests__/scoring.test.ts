import { describe, expect, it } from "vitest"
import { getStarRating, MAX_TURNS } from "@/game/scoring"

describe("getStarRating", () => {
  it("gives 5 stars for 1-2 turns", () => {
    expect(getStarRating(1)).toBe(5)
    expect(getStarRating(2)).toBe(5)
  })

  it("gives 4 stars for 3-4 turns", () => {
    expect(getStarRating(3)).toBe(4)
    expect(getStarRating(4)).toBe(4)
  })

  it("gives 3 stars for 5-6 turns", () => {
    expect(getStarRating(5)).toBe(3)
    expect(getStarRating(6)).toBe(3)
  })

  it("gives 2 stars for 7-8 turns", () => {
    expect(getStarRating(7)).toBe(2)
    expect(getStarRating(8)).toBe(2)
  })

  it("gives 1 star for 9+ turns", () => {
    expect(getStarRating(9)).toBe(1)
    expect(getStarRating(10)).toBe(1)
  })
})

describe("MAX_TURNS", () => {
  it("is 10", () => {
    expect(MAX_TURNS).toBe(10)
  })
})
