import { describe, it, expect } from "vitest";
import { createGame, orderTest, makeGuess, runTest, getAvailableTests } from "@/game/engine";
import { dateSeed } from "@/game/daily";
import { diseaseRegistry } from "@/data/diseases";
import { tests } from "@/data/tests";

describe("createGame", () => {
  it("creates a game with a valid disease", () => {
    const game = createGame("2026-04-02", diseaseRegistry);
    expect(game.date).toBe("2026-04-02");
    expect(game.status).toBe("playing");
    expect(game.turns).toHaveLength(0);
    expect(game.diseaseId).toBeTruthy();
    expect(game.chiefComplaint).toBeTruthy();
  });

  it("produces the same game for the same date", () => {
    const a = createGame("2026-04-02", diseaseRegistry);
    const b = createGame("2026-04-02", diseaseRegistry);
    expect(a.diseaseId).toBe(b.diseaseId);
    expect(a.chiefComplaint).toBe(b.chiefComplaint);
  });

  it("produces different games for different dates", () => {
    const a = createGame("2026-04-02", diseaseRegistry);
    const b = createGame("2026-04-03", diseaseRegistry);
    // Could theoretically be the same but very unlikely with 129 diseases
    expect(a.diseaseId === b.diseaseId && a.chiefComplaint === b.chiefComplaint).toBe(false);
  });
});

describe("runTest", () => {
  it("returns a resolved test result", () => {
    const disease = diseaseRegistry[0]!;
    const seed = dateSeed("2026-04-02");
    const result = runTest(disease, "temperature", seed);
    expect(result.testId).toBe("temperature");
    expect(result.testName).toBe("Temperature");
    expect(typeof result.value).toBe("number");
  });

  it("produces deterministic results", () => {
    const disease = diseaseRegistry[0]!;
    const seed = dateSeed("2026-04-02");
    const a = runTest(disease, "wbc", seed);
    const b = runTest(disease, "wbc", seed);
    expect(a.value).toBe(b.value);
    expect(a.abnormal).toBe(b.abnormal);
  });
});

describe("orderTest", () => {
  it("adds a turn to the game state", () => {
    const game = createGame("2026-04-02", diseaseRegistry);
    const disease = diseaseRegistry.find((d) => d.id === game.diseaseId)!;
    const seed = dateSeed("2026-04-02");
    const next = orderTest(game, "temperature", disease, seed);
    expect(next.turns).toHaveLength(1);
    expect(next.turns[0]!.type).toBe("test");
  });

  it("prevents duplicate tests", () => {
    const game = createGame("2026-04-02", diseaseRegistry);
    const disease = diseaseRegistry.find((d) => d.id === game.diseaseId)!;
    const seed = dateSeed("2026-04-02");
    const next1 = orderTest(game, "temperature", disease, seed);
    const next2 = orderTest(next1, "temperature", disease, seed);
    expect(next2.turns).toHaveLength(1); // not added again
  });
});

describe("makeGuess", () => {
  it("marks correct guess as won", () => {
    const game = createGame("2026-04-02", diseaseRegistry);
    const disease = diseaseRegistry.find((d) => d.id === game.diseaseId)!;
    const next = makeGuess(game, disease.id, disease.name, disease, disease);
    expect(next.status).toBe("won");
    expect(next.turns[0]!.type).toBe("guess");
  });

  it("provides feedback for wrong guess", () => {
    const game = createGame("2026-04-02", diseaseRegistry);
    const target = diseaseRegistry.find((d) => d.id === game.diseaseId)!;
    const wrong = diseaseRegistry.find((d) => d.id !== game.diseaseId)!;
    const next = makeGuess(game, wrong.id, wrong.name, target, wrong);
    expect(next.status).toBe("playing");
    const turn = next.turns[0]!;
    if (turn.type === "guess") {
      expect(turn.correct).toBe(false);
      expect(typeof turn.feedback.organSystemMatch).toBe("boolean");
      expect(typeof turn.feedback.severityMatch).toBe("boolean");
      expect(typeof turn.feedback.sharedAbnormalCount).toBe("number");
    }
  });
});

describe("getAvailableTests", () => {
  it("returns all tests for a fresh game", () => {
    const game = createGame("2026-04-02", diseaseRegistry);
    const available = getAvailableTests(game);
    expect(available.length).toBe(tests.length);
  });

  it("excludes already-run tests", () => {
    const game = createGame("2026-04-02", diseaseRegistry);
    const disease = diseaseRegistry.find((d) => d.id === game.diseaseId)!;
    const seed = dateSeed("2026-04-02");
    const next = orderTest(game, "temperature", disease, seed);
    const available = getAvailableTests(next);
    expect(available.length).toBe(tests.length - 1);
    expect(available.find((t) => t.id === "temperature")).toBeUndefined();
  });
});
