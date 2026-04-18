import type { DiagnosticTest } from "./types";

export const tests = [
  // ---- Vitals ----
  { id: "temperature", name: "Temperature", category: "vitals", resultType: "numeric", unit: "°C", normalRange: { low: 36.1, high: 37.2, label: "36.1–37.2 °C" }, cost: 1 },
  { id: "heart_rate", name: "Heart Rate", category: "vitals", resultType: "numeric", unit: "bpm", normalRange: { low: 60, high: 100, label: "60–100 bpm" }, cost: 1 },
  { id: "bp_systolic", name: "Blood Pressure (Systolic)", category: "vitals", resultType: "numeric", unit: "mmHg", normalRange: { low: 90, high: 140, label: "90–140 mmHg" }, cost: 1 },
  { id: "bp_diastolic", name: "Blood Pressure (Diastolic)", category: "vitals", resultType: "numeric", unit: "mmHg", normalRange: { low: 60, high: 90, label: "60–90 mmHg" }, cost: 1 },
  { id: "respiratory_rate", name: "Respiratory Rate", category: "vitals", resultType: "numeric", unit: "breaths/min", normalRange: { low: 12, high: 20, label: "12–20 breaths/min" }, cost: 1 },
  { id: "spo2", name: "Oxygen Saturation (SpO2)", category: "vitals", resultType: "numeric", unit: "%", normalRange: { low: 95, high: 100, label: "95–100%" }, cost: 1 },
  { id: "gcs", name: "Glasgow Coma Scale", category: "vitals", resultType: "numeric", unit: "/15", normalRange: { low: 15, high: 15, label: "15/15" }, cost: 1 },

  // ---- CBC ----
  { id: "wbc", name: "White Blood Cell Count", category: "cbc", resultType: "numeric", unit: "×10³/µL", normalRange: { low: 4.5, high: 11.0, label: "4.5–11.0 ×10³/µL" }, cost: 1 },
  { id: "rbc", name: "Red Blood Cell Count", category: "cbc", resultType: "numeric", unit: "×10⁶/µL", normalRange: { low: 4.2, high: 5.9, label: "4.2–5.9 ×10⁶/µL" }, cost: 1 },
  { id: "haemoglobin", name: "Haemoglobin", category: "cbc", resultType: "numeric", unit: "g/dL", normalRange: { low: 12.0, high: 17.5, label: "12.0–17.5 g/dL" }, cost: 1 },
  { id: "haematocrit", name: "Haematocrit", category: "cbc", resultType: "numeric", unit: "%", normalRange: { low: 36, high: 51, label: "36–51%" }, cost: 1 },
  { id: "platelets", name: "Platelet Count", category: "cbc", resultType: "numeric", unit: "×10³/µL", normalRange: { low: 150, high: 400, label: "150–400 ×10³/µL" }, cost: 1 },
  { id: "mcv", name: "Mean Corpuscular Volume", category: "cbc", resultType: "numeric", unit: "fL", normalRange: { low: 80, high: 100, label: "80–100 fL" }, cost: 1 },
  { id: "reticulocyte_count", name: "Reticulocyte Count", category: "cbc", resultType: "numeric", unit: "%", normalRange: { low: 0.5, high: 2.5, label: "0.5–2.5%" }, cost: 2 },

  // ---- BMP ----
  { id: "sodium", name: "Sodium", category: "bmp", resultType: "numeric", unit: "mEq/L", normalRange: { low: 136, high: 145, label: "136–145 mEq/L" }, cost: 1 },
  { id: "potassium", name: "Potassium", category: "bmp", resultType: "numeric", unit: "mEq/L", normalRange: { low: 3.5, high: 5.0, label: "3.5–5.0 mEq/L" }, cost: 1 },
  { id: "chloride", name: "Chloride", category: "bmp", resultType: "numeric", unit: "mEq/L", normalRange: { low: 98, high: 106, label: "98–106 mEq/L" }, cost: 1 },
  { id: "bicarbonate", name: "Bicarbonate (CO2)", category: "bmp", resultType: "numeric", unit: "mEq/L", normalRange: { low: 22, high: 29, label: "22–29 mEq/L" }, cost: 1 },
  { id: "bun", name: "Blood Urea Nitrogen", category: "bmp", resultType: "numeric", unit: "mg/dL", normalRange: { low: 7, high: 20, label: "7–20 mg/dL" }, cost: 1 },
  { id: "creatinine", name: "Creatinine", category: "bmp", resultType: "numeric", unit: "mg/dL", normalRange: { low: 0.6, high: 1.2, label: "0.6–1.2 mg/dL" }, cost: 1 },
  { id: "glucose", name: "Glucose", category: "bmp", resultType: "numeric", unit: "mg/dL", normalRange: { low: 70, high: 100, label: "70–100 mg/dL" }, cost: 1 },
  { id: "calcium", name: "Calcium", category: "bmp", resultType: "numeric", unit: "mg/dL", normalRange: { low: 8.5, high: 10.5, label: "8.5–10.5 mg/dL" }, cost: 1 },
  { id: "magnesium", name: "Magnesium", category: "bmp", resultType: "numeric", unit: "mg/dL", normalRange: { low: 1.7, high: 2.2, label: "1.7–2.2 mg/dL" }, cost: 1 },
  { id: "phosphate", name: "Phosphate", category: "bmp", resultType: "numeric", unit: "mg/dL", normalRange: { low: 2.5, high: 4.5, label: "2.5–4.5 mg/dL" }, cost: 1 },
  { id: "uric_acid", name: "Uric Acid", category: "bmp", resultType: "numeric", unit: "mg/dL", normalRange: { low: 3.5, high: 7.2, label: "3.5–7.2 mg/dL" }, cost: 1 },

  // ---- Liver Panel ----
  { id: "alt", name: "ALT", category: "liver", resultType: "numeric", unit: "U/L", normalRange: { low: 7, high: 56, label: "7–56 U/L" }, cost: 1 },
  { id: "ast", name: "AST", category: "liver", resultType: "numeric", unit: "U/L", normalRange: { low: 10, high: 40, label: "10–40 U/L" }, cost: 1 },
  { id: "alp", name: "Alkaline Phosphatase", category: "liver", resultType: "numeric", unit: "U/L", normalRange: { low: 44, high: 147, label: "44–147 U/L" }, cost: 1 },
  { id: "bilirubin", name: "Total Bilirubin", category: "liver", resultType: "numeric", unit: "mg/dL", normalRange: { low: 0.1, high: 1.2, label: "0.1–1.2 mg/dL" }, cost: 1 },
  { id: "albumin", name: "Albumin", category: "liver", resultType: "numeric", unit: "g/dL", normalRange: { low: 3.5, high: 5.5, label: "3.5–5.5 g/dL" }, cost: 1 },
  { id: "ggt", name: "GGT", category: "liver", resultType: "numeric", unit: "U/L", normalRange: { low: 0, high: 45, label: "0–45 U/L" }, cost: 1 },

  // ---- Cardiac Markers ----
  { id: "troponin", name: "Troponin I", category: "cardiac", resultType: "numeric", unit: "ng/mL", normalRange: { low: 0, high: 0.04, label: "<0.04 ng/mL" }, cost: 2 },
  { id: "ck_mb", name: "CK-MB", category: "cardiac", resultType: "numeric", unit: "U/L", normalRange: { low: 0, high: 25, label: "0–25 U/L" }, cost: 2 },
  { id: "bnp", name: "BNP", category: "cardiac", resultType: "numeric", unit: "pg/mL", normalRange: { low: 0, high: 100, label: "<100 pg/mL" }, cost: 2 },

  // ---- Coagulation ----
  { id: "pt_inr", name: "PT/INR", category: "coagulation", resultType: "numeric", unit: "", normalRange: { low: 0.8, high: 1.1, label: "0.8–1.1" }, cost: 1 },
  { id: "aptt", name: "aPTT", category: "coagulation", resultType: "numeric", unit: "seconds", normalRange: { low: 25, high: 35, label: "25–35 seconds" }, cost: 1 },
  { id: "d_dimer", name: "D-dimer", category: "coagulation", resultType: "numeric", unit: "µg/mL", normalRange: { low: 0, high: 0.5, label: "<0.5 µg/mL" }, cost: 2 },
  { id: "fibrinogen", name: "Fibrinogen", category: "coagulation", resultType: "numeric", unit: "mg/dL", normalRange: { low: 200, high: 400, label: "200–400 mg/dL" }, cost: 2 },

  // ---- Inflammatory / Other Labs ----
  { id: "crp", name: "C-Reactive Protein", category: "inflammatory", resultType: "numeric", unit: "mg/L", normalRange: { low: 0, high: 10, label: "<10 mg/L" }, cost: 1 },
  { id: "esr", name: "Erythrocyte Sedimentation Rate", category: "inflammatory", resultType: "numeric", unit: "mm/hr", normalRange: { low: 0, high: 20, label: "0–20 mm/hr" }, cost: 1 },
  { id: "procalcitonin", name: "Procalcitonin", category: "inflammatory", resultType: "numeric", unit: "ng/mL", normalRange: { low: 0, high: 0.1, label: "<0.1 ng/mL" }, cost: 2 },
  { id: "lactate", name: "Lactate", category: "inflammatory", resultType: "numeric", unit: "mmol/L", normalRange: { low: 0.5, high: 2.0, label: "0.5–2.0 mmol/L" }, cost: 2 },
  { id: "tsh", name: "TSH", category: "inflammatory", resultType: "numeric", unit: "mIU/L", normalRange: { low: 0.4, high: 4.0, label: "0.4–4.0 mIU/L" }, cost: 2 },
  { id: "hba1c", name: "HbA1c", category: "inflammatory", resultType: "numeric", unit: "%", normalRange: { low: 4.0, high: 5.6, label: "4.0–5.6%" }, cost: 2 },
  { id: "ldh", name: "Lactate Dehydrogenase (LDH)", category: "inflammatory", resultType: "numeric", unit: "U/L", normalRange: { low: 140, high: 280, label: "140–280 U/L" }, cost: 1 },
  { id: "ferritin", name: "Ferritin", category: "inflammatory", resultType: "numeric", unit: "ng/mL", normalRange: { low: 20, high: 250, label: "20–250 ng/mL" }, cost: 2 },
  { id: "amylase", name: "Amylase", category: "inflammatory", resultType: "numeric", unit: "U/L", normalRange: { low: 28, high: 100, label: "28–100 U/L" }, cost: 2 },
  { id: "lipase", name: "Lipase", category: "inflammatory", resultType: "numeric", unit: "U/L", normalRange: { low: 0, high: 160, label: "0–160 U/L" }, cost: 2 },

  // ---- Urinalysis ----
  { id: "urine_dipstick", name: "Urine Dipstick", category: "urinalysis", resultType: "categorical", normalValue: "Normal — no protein, blood, glucose, nitrites, or leukocytes", cost: 1 },
  { id: "urine_culture", name: "Urine Culture", category: "urinalysis", resultType: "categorical", normalValue: "No growth", cost: 2 },

  // ---- Imaging ----
  { id: "chest_xray", name: "Chest X-ray", category: "imaging", resultType: "categorical", normalValue: "No acute cardiopulmonary abnormality", cost: 2 },
  { id: "ct_head", name: "CT Head", category: "imaging", resultType: "categorical", normalValue: "No acute intracranial abnormality", cost: 3 },
  { id: "ct_abdomen", name: "CT Abdomen/Pelvis", category: "imaging", resultType: "categorical", normalValue: "No acute abnormality", cost: 3 },
  { id: "ct_angiogram", name: "CT Pulmonary Angiogram", category: "imaging", resultType: "categorical", normalValue: "No pulmonary embolism", cost: 3 },
  { id: "abdominal_ultrasound", name: "Abdominal Ultrasound", category: "imaging", resultType: "categorical", normalValue: "Normal appearance of abdominal organs", cost: 2 },
  { id: "echocardiogram", name: "Echocardiogram", category: "imaging", resultType: "categorical", normalValue: "Normal cardiac structure and function, EF 55-65%", cost: 3 },
  { id: "mri_brain", name: "MRI Brain", category: "imaging", resultType: "categorical", normalValue: "No acute intracranial abnormality", cost: 3 },
  { id: "ct_chest", name: "CT Chest", category: "imaging", resultType: "categorical", normalValue: "No acute thoracic abnormality", cost: 3 },
  { id: "doppler_ultrasound", name: "Doppler Ultrasound", category: "imaging", resultType: "categorical", normalValue: "Normal arterial and venous flow", cost: 2 },
  { id: "x_ray_spine", name: "X-ray Spine", category: "imaging", resultType: "categorical", normalValue: "Normal vertebral alignment, no fractures", cost: 2 },

  // ---- Physical Exam ----
  { id: "lung_auscultation", name: "Lung Auscultation", category: "physical_exam", resultType: "categorical", normalValue: "Clear bilateral air entry, no added sounds", cost: 1 },
  { id: "heart_auscultation", name: "Heart Auscultation", category: "physical_exam", resultType: "categorical", normalValue: "Regular rate and rhythm, no murmurs", cost: 1 },
  { id: "abdominal_exam", name: "Abdominal Examination", category: "physical_exam", resultType: "categorical", normalValue: "Soft, non-tender, no organomegaly", cost: 1 },
  { id: "neurological_exam", name: "Neurological Examination", category: "physical_exam", resultType: "categorical", normalValue: "Alert, oriented, no focal deficits", cost: 1 },
  { id: "skin_exam", name: "Skin Examination", category: "physical_exam", resultType: "categorical", normalValue: "No rashes, lesions, or abnormalities", cost: 1 },
  { id: "musculoskeletal_exam", name: "Musculoskeletal Examination", category: "physical_exam", resultType: "categorical", normalValue: "Full range of motion, no joint swelling or tenderness", cost: 1 },
  { id: "thyroid_exam", name: "Thyroid Examination", category: "physical_exam", resultType: "categorical", normalValue: "No thyroid enlargement, no nodules", cost: 1 },

  // ---- Specialty ----
  { id: "ecg", name: "ECG (12-lead)", category: "specialty", resultType: "categorical", normalValue: "Normal sinus rhythm, no ST changes", cost: 2 },
  { id: "lumbar_puncture", name: "Lumbar Puncture (CSF)", category: "specialty", resultType: "categorical", normalValue: "Clear CSF, normal WBC, glucose, and protein", cost: 3 },
  { id: "blood_cultures", name: "Blood Cultures", category: "specialty", resultType: "categorical", normalValue: "No growth at 48 hours", cost: 2 },
  { id: "spirometry", name: "Spirometry (PFTs)", category: "specialty", resultType: "categorical", normalValue: "Normal FEV1/FVC ratio, no obstruction or restriction", cost: 2 },
  { id: "peripheral_blood_smear", name: "Peripheral Blood Smear", category: "specialty", resultType: "categorical", normalValue: "Normal red cell morphology, no abnormal cells", cost: 2 },
  { id: "sputum_culture", name: "Sputum Culture", category: "specialty", resultType: "categorical", normalValue: "Normal respiratory flora", cost: 2 },
  { id: "stool_sample", name: "Stool Sample", category: "specialty", resultType: "categorical", normalValue: "No pathogens, no occult blood, normal calprotectin", cost: 2 },
  { id: "joint_aspiration", name: "Joint Aspiration (Synovial Fluid)", category: "specialty", resultType: "categorical", normalValue: "Clear fluid, low WCC, no crystals", cost: 3 },
] as const satisfies readonly DiagnosticTest[];

export type TestId = (typeof tests)[number]["id"];

// Lookup map for quick access by ID
export const testMap: ReadonlyMap<string, DiagnosticTest> = new Map(
  tests.map((t) => [t.id as string, t as DiagnosticTest])
);
