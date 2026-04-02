import type { DiseaseProfile, Turn } from "@/data/types";

/**
 * Count how many diseases are still consistent with the observed test results.
 * A disease is "possible" if every abnormal result is in its abnormal map
 * and every normal result is NOT in its abnormal map.
 */
function countCandidates(
  diseases: readonly DiseaseProfile[],
  testResults: { testId: string; abnormal: boolean }[]
): number {
  if (testResults.length === 0) return diseases.length;

  return diseases.filter((disease) =>
    testResults.every((r) =>
      r.abnormal
        ? disease.abnormals.has(r.testId)
        : !disease.abnormals.has(r.testId)
    )
  ).length;
}

/**
 * Compute the narrowing sequence: how many candidates remained after each turn.
 * Returns an array of { turn index, candidate count, turn type }.
 */
export function getNarrowingSequence(
  turns: Turn[],
  diseases: readonly DiseaseProfile[]
): { count: number; type: "test" | "guess" }[] {
  const observed: { testId: string; abnormal: boolean }[] = [];
  const sequence: { count: number; type: "test" | "guess" }[] = [];

  for (const turn of turns) {
    if (turn.type === "test") {
      observed.push({
        testId: turn.result.testId,
        abnormal: turn.result.abnormal,
      });
      sequence.push({
        count: countCandidates(diseases, observed),
        type: "test",
      });
    } else {
      // A correct guess means we've narrowed to 1
      const count = turn.correct
        ? 1
        : observed.length > 0
          ? countCandidates(diseases, observed)
          : diseases.length;
      sequence.push({ count, type: "guess" });
    }
  }

  return sequence;
}

const MAX_BAR = 10;

export function narrowingEmojiLine(
  s: { count: number; type: "test" | "guess" },
  total: number
): string {
  const ruledOut = total - s.count;
  const filled = Math.min(MAX_BAR, Math.max(0, Math.round((ruledOut / total) * MAX_BAR)));
  const icon = s.type === "test" ? "🧪" : "💡";
  return `${icon} ${"🟩".repeat(filled)}${"⬜".repeat(MAX_BAR - filled)} ${ruledOut}`;
}

/**
 * Build a shareable text chart of the narrowing funnel.
 */
export function narrowingShareText(
  turns: Turn[],
  diseases: readonly DiseaseProfile[]
): string {
  const total = diseases.length;
  const seq = getNarrowingSequence(turns, diseases);
  return seq.map((s) => narrowingEmojiLine(s, total)).join("\n");
}
