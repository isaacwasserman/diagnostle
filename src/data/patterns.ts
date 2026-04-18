import type { LabPattern } from "./types";

// ---- Inflammatory / Infection ----

export const acuteInflammation: LabPattern = {
  name: "acuteInflammation",
  abnormals: {
    crp: { direction: "high", range: [20, 150] },
    esr: { direction: "high", range: [30, 80] },
    wbc: { direction: "high", range: [11, 25] },
  },
};

export const bacterialInfection: LabPattern = {
  name: "bacterialInfection",
  abnormals: {
    ...acuteInflammation.abnormals,
    temperature: { direction: "high", range: [38.5, 40.5] },
    heart_rate: { direction: "high", range: [100, 130] },
    procalcitonin: { direction: "high", range: [2, 50] },
    ferritin: { direction: "high", range: [300, 1500] },
    blood_cultures: { value: "Positive — organism identified" },
  },
};

export const viralInfection: LabPattern = {
  name: "viralInfection",
  abnormals: {
    temperature: { direction: "high", range: [37.8, 39.5] },
    heart_rate: { direction: "high", range: [90, 115] },
    crp: { direction: "high", range: [5, 40] },
    esr: { direction: "high", range: [20, 50] },
    wbc: { direction: "low", range: [2, 3.8] },
  },
};

export const severeInfection: LabPattern = {
  name: "severeInfection",
  abnormals: {
    ...bacterialInfection.abnormals,
    lactate: { direction: "high", range: [2.5, 8] },
    bp_systolic: { direction: "low", range: [70, 90] },
    respiratory_rate: { direction: "high", range: [22, 35] },
  },
};

// ---- Hepatic ----

export const hepatocellularDamage: LabPattern = {
  name: "hepatocellularDamage",
  abnormals: {
    alt: { direction: "high", range: [80, 2000] },
    ast: { direction: "high", range: [60, 1500] },
    bilirubin: { direction: "high", range: [2, 15] },
    albumin: { direction: "low", range: [1.5, 3.2] },
    pt_inr: { direction: "high", range: [1.3, 2.5] },
    ldh: { direction: "high", range: [300, 800] },
  },
};

export const cholestatic: LabPattern = {
  name: "cholestatic",
  abnormals: {
    alp: { direction: "high", range: [200, 800] },
    bilirubin: { direction: "high", range: [3, 25] },
    alt: { direction: "high", range: [40, 150] },
    ast: { direction: "high", range: [35, 120] },
    ggt: { direction: "high", range: [80, 400] },
  },
};

export const chronicLiver: LabPattern = {
  name: "chronicLiver",
  abnormals: {
    alt: { direction: "high", range: [45, 200] },
    ast: { direction: "high", range: [40, 180] },
    albumin: { direction: "low", range: [2.0, 3.4] },
    bilirubin: { direction: "high", range: [1.5, 8] },
    pt_inr: { direction: "high", range: [1.2, 2.0] },
    platelets: { direction: "low", range: [60, 140] },
    ggt: { direction: "high", range: [50, 300] },
  },
};

// ---- Cardiac ----

export const acuteCardiacInjury: LabPattern = {
  name: "acuteCardiacInjury",
  abnormals: {
    troponin: { direction: "high", range: [0.1, 15] },
    ck_mb: { direction: "high", range: [25, 300] },
    ldh: { direction: "high", range: [300, 600] },
    ecg: { value: "ST-segment changes" },
  },
};

export const heartFailurePattern: LabPattern = {
  name: "heartFailure",
  abnormals: {
    bnp: { direction: "high", range: [400, 5000] },
    echocardiogram: { value: "Reduced ejection fraction" },
    chest_xray: { value: "Pulmonary congestion, cardiomegaly" },
    spo2: { direction: "low", range: [88, 94] },
  },
};

export const tachyarrhythmia: LabPattern = {
  name: "tachyarrhythmia",
  abnormals: {
    heart_rate: { direction: "high", range: [110, 180] },
    ecg: { value: "Abnormal rhythm detected" },
    bnp: { direction: "high", range: [100, 500] },
  },
};

// ---- Renal ----

export const acuteRenalFailure: LabPattern = {
  name: "acuteRenalFailure",
  abnormals: {
    creatinine: { direction: "high", range: [2.0, 8.0] },
    bun: { direction: "high", range: [30, 80] },
    potassium: { direction: "high", range: [5.5, 7.0] },
    bicarbonate: { direction: "low", range: [12, 20] },
    phosphate: { direction: "high", range: [5.0, 8.0] },
    uric_acid: { direction: "high", range: [8, 15] },
  },
};

export const chronicRenalFailure: LabPattern = {
  name: "chronicRenalFailure",
  abnormals: {
    creatinine: { direction: "high", range: [1.5, 6.0] },
    bun: { direction: "high", range: [25, 60] },
    potassium: { direction: "high", range: [5.0, 6.5] },
    calcium: { direction: "low", range: [6.5, 8.0] },
    hemoglobin: { direction: "low", range: [7, 11] },
    bicarbonate: { direction: "low", range: [15, 21] },
    phosphate: { direction: "high", range: [4.8, 7.0] },
    uric_acid: { direction: "high", range: [7.5, 12] },
  },
};

// ---- Coagulation ----

export const dic: LabPattern = {
  name: "dic",
  abnormals: {
    platelets: { direction: "low", range: [20, 80] },
    pt_inr: { direction: "high", range: [1.8, 4.0] },
    aptt: { direction: "high", range: [45, 90] },
    d_dimer: { direction: "high", range: [4, 20] },
    fibrinogen: { direction: "low", range: [50, 150] },
  },
};

export const thrombotic: LabPattern = {
  name: "thrombotic",
  abnormals: {
    d_dimer: { direction: "high", range: [1, 10] },
  },
};

// ---- Respiratory ----

export const respiratoryDistress: LabPattern = {
  name: "respiratoryDistress",
  abnormals: {
    respiratory_rate: { direction: "high", range: [24, 40] },
    spo2: { direction: "low", range: [82, 93] },
  },
};

export const obstructiveAirway: LabPattern = {
  name: "obstructiveAirway",
  abnormals: {
    respiratory_rate: { direction: "high", range: [22, 32] },
    spo2: { direction: "low", range: [88, 94] },
    lung_auscultation: { value: "Widespread wheeze" },
    chest_xray: { value: "Hyperinflated lungs" },
    spirometry: { value: "Obstructive pattern — reduced FEV1/FVC ratio" },
  },
};

// ---- Anemia ----

export const anemia: LabPattern = {
  name: "anemia",
  abnormals: {
    hemoglobin: { direction: "low", range: [5, 11] },
    rbc: { direction: "low", range: [2.5, 4.0] },
    hematocrit: { direction: "low", range: [20, 35] },
    heart_rate: { direction: "high", range: [90, 120] },
    ldh: { direction: "high", range: [280, 500] },
  },
};

export const microcyticAnemia: LabPattern = {
  name: "microcyticAnemia",
  abnormals: {
    ...anemia.abnormals,
    mcv: { direction: "low", range: [55, 78] },
    ferritin: { direction: "low", range: [3, 18] },
    reticulocyte_count: { direction: "low", range: [0.1, 0.4] },
  },
};

export const macrocyticAnemia: LabPattern = {
  name: "macrocyticAnemia",
  abnormals: {
    ...anemia.abnormals,
    mcv: { direction: "high", range: [101, 130] },
    reticulocyte_count: { direction: "low", range: [0.1, 0.4] },
    peripheral_blood_smear: { value: "Megaloblasts, hypersegmented neutrophils" },
  },
};

// ---- Endocrine ----

export const hyperglycemia: LabPattern = {
  name: "hyperglycemia",
  abnormals: {
    glucose: { direction: "high", range: [200, 600] },
    hba1c: { direction: "high", range: [7, 14] },
  },
};

export const metabolicAcidosis: LabPattern = {
  name: "metabolicAcidosis",
  abnormals: {
    bicarbonate: { direction: "low", range: [8, 18] },
    potassium: { direction: "high", range: [5.0, 7.0] },
    respiratory_rate: { direction: "high", range: [22, 36] },
    phosphate: { direction: "low", range: [1.0, 2.3] },
  },
};

// ---- Autoimmune / Chronic Inflammation ----

export const chronicInflammation: LabPattern = {
  name: "chronicInflammation",
  abnormals: {
    crp: { direction: "high", range: [10, 80] },
    esr: { direction: "high", range: [30, 100] },
    albumin: { direction: "low", range: [2.5, 3.4] },
  },
};

export const autoimmune: LabPattern = {
  name: "autoimmune",
  abnormals: {
    ...chronicInflammation.abnormals,
    wbc: { direction: "low", range: [2.5, 4.0] },
    hemoglobin: { direction: "low", range: [9, 12] },
  },
};

// ---- Cancer / Malignancy ----

export const malignancy: LabPattern = {
  name: "malignancy",
  abnormals: {
    albumin: { direction: "low", range: [2.0, 3.3] },
    hemoglobin: { direction: "low", range: [8, 11.5] },
    esr: { direction: "high", range: [40, 100] },
    calcium: { direction: "high", range: [10.8, 14] },
    ldh: { direction: "high", range: [300, 800] },
    ferritin: { direction: "high", range: [300, 2000] },
  },
};

export const leukemia: LabPattern = {
  name: "leukemia",
  abnormals: {
    wbc: { direction: "high", range: [20, 200] },
    hemoglobin: { direction: "low", range: [5, 10] },
    platelets: { direction: "low", range: [10, 80] },
    esr: { direction: "high", range: [50, 120] },
    lactate: { direction: "high", range: [2.5, 6] },
    ldh: { direction: "high", range: [400, 2000] },
    uric_acid: { direction: "high", range: [8, 18] },
    peripheral_blood_smear: { value: "Blast cells identified" },
  },
};

// ---- Neurological ----

export const acuteStroke: LabPattern = {
  name: "acuteStroke",
  abnormals: {
    bp_systolic: { direction: "high", range: [160, 220] },
    gcs: { direction: "low", range: [8, 14] },
    neurological_exam: { value: "Focal neurological deficit" },
    ct_head: { value: "Acute changes identified" },
  },
};
