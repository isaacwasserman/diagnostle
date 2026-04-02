// ---- Test categories ----
export type TestCategory =
  | "vitals"
  | "cbc"
  | "bmp"
  | "liver"
  | "cardiac"
  | "coagulation"
  | "inflammatory"
  | "urinalysis"
  | "imaging"
  | "physical_exam"
  | "specialty";

// ---- Test definitions (array-driven, IDs derived) ----
export interface NumericTest {
  id: string;
  name: string;
  category: TestCategory;
  resultType: "numeric";
  unit: string;
  normalRange: { low: number; high: number; label: string };
  cost: 1 | 2 | 3;
}

export interface CategoricalTest {
  id: string;
  name: string;
  category: TestCategory;
  resultType: "categorical";
  normalValue: string;
  cost: 1 | 2 | 3;
}

export type DiagnosticTest = NumericTest | CategoricalTest;

// ---- Abnormal result specs ----
export interface NumericAbnormal {
  direction: "high" | "low";
  range: [number, number];
}

export interface CategoricalAbnormal {
  value: string;
}

export type AbnormalSpec = NumericAbnormal | CategoricalAbnormal;
export type AbnormalMap = Record<string, AbnormalSpec>;

// ---- Reusable lab pattern ----
export interface LabPattern {
  name: string;
  abnormals: AbnormalMap;
}

// ---- Authored disease definition (composable) ----
export interface DiseaseDef {
  id: string;
  name: string;
  chiefComplaints: string[];
  organSystem: string;
  severity: "mild" | "moderate" | "severe" | "critical";
  keywords: string[];
  patterns: LabPattern[];
  overrides?: AbnormalMap;
  remove?: string[];
}

// ---- Resolved flat profile (what the game engine uses) ----
export interface DiseaseProfile {
  id: string;
  name: string;
  chiefComplaints: string[];
  organSystem: string;
  severity: "mild" | "moderate" | "severe" | "critical";
  keywords: string[];
  abnormals: ReadonlyMap<string, AbnormalSpec>;
}

// ---- Resolved test result (returned to UI) ----
export interface ResolvedTestResult {
  testId: string;
  testName: string;
  category: TestCategory;
  value: number | string;
  unit?: string;
  abnormal: boolean;
  normalRange?: { low: number; high: number; label: string };
}

// ---- Game state ----
export type GameStatus = "playing" | "won" | "lost";

export interface GameState {
  date: string;
  diseaseId: string;
  chiefComplaint: string;
  turns: Turn[];
  status: GameStatus;
  maxTurns: number;
}

export type Turn =
  | { type: "test"; result: ResolvedTestResult }
  | { type: "guess"; guess: string; correct: boolean; feedback: GuessFeedback };

export interface GuessFeedback {
  organSystemMatch: boolean;
  severityMatch: boolean;
  sharedAbnormalCount: number;
}
