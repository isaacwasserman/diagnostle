import { describe, expect, it } from "vitest"
import { diseaseRegistry } from "@/data/diseases"
import { testMap, tests } from "@/data/tests"

describe("disease data integrity", () => {
  it("has at least 100 diseases", () => {
    expect(diseaseRegistry.length).toBeGreaterThanOrEqual(100)
  })

  it("all diseases have unique IDs", () => {
    const ids = diseaseRegistry.map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("all diseases have a name", () => {
    for (const d of diseaseRegistry) {
      expect(d.name.length).toBeGreaterThan(0)
    }
  })

  it("all diseases have at least 1 chief complaint", () => {
    for (const d of diseaseRegistry) {
      expect(d.chiefComplaints.length).toBeGreaterThanOrEqual(1)
    }
  })

  it("all diseases have at least 3 abnormal tests", () => {
    const under3: string[] = []
    for (const d of diseaseRegistry) {
      if (d.abnormals.size < 3) {
        under3.push(`${d.name} (${d.id}): ${d.abnormals.size} abnormals`)
      }
    }
    expect(under3).toEqual([])
  })

  it("all abnormal test IDs reference valid tests", () => {
    const invalid: string[] = []
    for (const d of diseaseRegistry) {
      for (const testId of d.abnormals.keys()) {
        if (!testMap.has(testId)) {
          invalid.push(`${d.name}: unknown test "${testId}"`)
        }
      }
    }
    expect(invalid).toEqual([])
  })

  it("all diseases have an organ system", () => {
    for (const d of diseaseRegistry) {
      expect(d.organSystem.length).toBeGreaterThan(0)
    }
  })

  it("all diseases have a severity", () => {
    const valid = ["mild", "moderate", "severe", "critical"]
    for (const d of diseaseRegistry) {
      expect(valid).toContain(d.severity)
    }
  })

  it("all diseases have keywords", () => {
    for (const d of diseaseRegistry) {
      expect(d.keywords.length).toBeGreaterThanOrEqual(1)
    }
  })

  it("numeric abnormals have valid ranges", () => {
    const invalid: string[] = []
    for (const d of diseaseRegistry) {
      for (const [testId, spec] of d.abnormals) {
        if ("range" in spec) {
          const [min, max] = spec.range
          if (min > max) {
            invalid.push(`${d.name}/${testId}: min ${min} > max ${max}`)
          }
          if (min < 0 && !["gcs"].includes(testId)) {
            // Some tests can be 0 but negative is suspicious
            // Allow it for now but flag it
          }
        }
      }
    }
    expect(invalid).toEqual([])
  })
})

describe("test definitions integrity", () => {
  it("has at least 50 tests", () => {
    expect(tests.length).toBeGreaterThanOrEqual(50)
  })

  it("all tests have unique IDs", () => {
    const ids = tests.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("numeric tests have valid normal ranges", () => {
    for (const t of tests) {
      if (t.resultType === "numeric") {
        expect(t.normalRange.low).toBeLessThanOrEqual(t.normalRange.high)
      }
    }
  })

  it("categorical tests have a normal value", () => {
    for (const t of tests) {
      if (t.resultType === "categorical") {
        expect(t.normalValue.length).toBeGreaterThan(0)
      }
    }
  })
})
