import type { DiseaseDef } from "../types";
import {
  acuteCardiacInjury,
  heartFailurePattern,
  tachyarrhythmia,
  thrombotic,
  acuteInflammation,
  bacterialInfection,
  respiratoryDistress,
} from "../patterns";

export const diseases: DiseaseDef[] = [
  // ---- 1. Heart Attack (Myocardial Infarction) ----
  {
    id: "heart_attack",
    name: "Heart Attack (Myocardial Infarction)",
    chiefComplaints: ["chest pain", "shortness of breath", "arm pain"],
    organSystem: "cardiovascular",
    severity: "critical",
    keywords: ["heart attack", "mi", "myocardial infarction", "stemi", "nstemi"],
    patterns: [acuteCardiacInjury],
    overrides: {
      ecg: { value: "ST elevation in contiguous leads" },
      troponin: { direction: "high", range: [2, 50] },
      heart_rate: { direction: "high", range: [90, 130] },
      bp_systolic: { direction: "low", range: [80, 100] },
      chest_xray: { value: "Possible pulmonary oedema" },
      heart_auscultation: { value: "S4 gallop" },
    },
  },

  // ---- 2. Angina ----
  {
    id: "angina",
    name: "Angina",
    chiefComplaints: ["chest pain", "chest tightness", "shortness of breath on exertion"],
    organSystem: "cardiovascular",
    severity: "moderate",
    keywords: ["angina", "angina pectoris", "stable angina", "unstable angina"],
    patterns: [acuteCardiacInjury],
    overrides: {
      troponin: { direction: "high", range: [0.04, 0.4] },
      ck_mb: { direction: "high", range: [25, 50] },
      ecg: { value: "ST depression during pain, resolves at rest" },
      heart_rate: { direction: "high", range: [80, 110] },
      bp_systolic: { direction: "high", range: [145, 170] },
      echocardiogram: { value: "Regional wall motion abnormality on stress test" },
    },
  },

  // ---- 3. Atrial Fibrillation ----
  {
    id: "atrial_fibrillation",
    name: "Atrial Fibrillation",
    chiefComplaints: ["palpitations", "shortness of breath", "dizziness"],
    organSystem: "cardiovascular",
    severity: "moderate",
    keywords: ["atrial fibrillation", "af", "afib", "irregular heartbeat"],
    patterns: [tachyarrhythmia],
    overrides: {
      ecg: { value: "Irregularly irregular rhythm, absent P waves, fibrillatory baseline" },
      heart_rate: { direction: "high", range: [110, 170] },
      echocardiogram: { value: "Left atrial dilatation" },
    },
  },

  // ---- 4. Heart Failure ----
  {
    id: "heart_failure",
    name: "Heart Failure",
    chiefComplaints: ["shortness of breath", "leg swelling", "fatigue"],
    organSystem: "cardiovascular",
    severity: "severe",
    keywords: ["heart failure", "congestive heart failure", "chf", "hfref", "hfpef"],
    patterns: [heartFailurePattern],
    overrides: {
      heart_rate: { direction: "high", range: [90, 120] },
      lung_auscultation: { value: "Bilateral basal crackles" },
      heart_auscultation: { value: "S3 gallop, displaced apex beat" },
      creatinine: { direction: "high", range: [1.3, 2.5] },
      sodium: { direction: "low", range: [128, 135] },
    },
  },

  // ---- 5. Heart Block ----
  {
    id: "heart_block",
    name: "Heart Block",
    chiefComplaints: ["dizziness", "fainting", "fatigue"],
    organSystem: "cardiovascular",
    severity: "severe",
    keywords: ["heart block", "av block", "atrioventricular block", "bradycardia", "complete heart block"],
    patterns: [],
    overrides: {
      heart_rate: { direction: "low", range: [30, 55] },
      ecg: { value: "Prolonged PR interval / dissociated P waves and QRS complexes" },
      bp_systolic: { direction: "low", range: [80, 95] },
      troponin: { direction: "high", range: [0.04, 0.2] },
      echocardiogram: { value: "Reduced cardiac output, dyssynchrony" },
    },
  },

  // ---- 6. Abdominal Aortic Aneurysm ----
  {
    id: "abdominal_aortic_aneurysm",
    name: "Abdominal Aortic Aneurysm",
    chiefComplaints: ["abdominal pain", "back pain", "pulsatile abdominal mass"],
    organSystem: "cardiovascular",
    severity: "critical",
    keywords: ["aaa", "abdominal aortic aneurysm", "aortic aneurysm", "ruptured aaa"],
    patterns: [],
    overrides: {
      bp_systolic: { direction: "low", range: [70, 95] },
      heart_rate: { direction: "high", range: [100, 140] },
      haemoglobin: { direction: "low", range: [6, 10] },
      ct_abdomen: { value: "Dilated abdominal aorta >5.5 cm, possible retroperitoneal haematoma" },
      abdominal_ultrasound: { value: "Aortic dilatation >5.5 cm" },
      abdominal_exam: { value: "Pulsatile expansile mass, tender" },
      lactate: { direction: "high", range: [2.5, 8] },
    },
  },

  // ---- 7. Coronary Heart Disease ----
  {
    id: "coronary_heart_disease",
    name: "Coronary Heart Disease",
    chiefComplaints: ["chest pain on exertion", "shortness of breath", "fatigue"],
    organSystem: "cardiovascular",
    severity: "moderate",
    keywords: ["coronary heart disease", "chd", "coronary artery disease", "cad", "ischaemic heart disease"],
    patterns: [],
    overrides: {
      ecg: { value: "ST depression on exercise stress test" },
      echocardiogram: { value: "Regional wall motion abnormality" },
      troponin: { direction: "high", range: [0.04, 0.3] },
      bp_systolic: { direction: "high", range: [145, 180] },
      glucose: { direction: "high", range: [100, 140] },
      chest_xray: { value: "Mild cardiomegaly" },
    },
  },

  // ---- 8. Endocarditis ----
  {
    id: "endocarditis",
    name: "Endocarditis",
    chiefComplaints: ["fever", "fatigue", "new heart murmur"],
    organSystem: "cardiovascular",
    severity: "severe",
    keywords: ["endocarditis", "infective endocarditis", "bacterial endocarditis", "valve infection"],
    patterns: [bacterialInfection],
    overrides: {
      heart_auscultation: { value: "New regurgitant murmur" },
      echocardiogram: { value: "Valvular vegetations identified" },
      haemoglobin: { direction: "low", range: [8, 11] },
      creatinine: { direction: "high", range: [1.3, 2.5] },
      skin_exam: { value: "Janeway lesions, Osler nodes, splinter haemorrhages" },
    },
  },

  // ---- 9. Pericarditis ----
  {
    id: "pericarditis",
    name: "Pericarditis",
    chiefComplaints: ["sharp chest pain worse on inspiration", "chest pain relieved by leaning forward", "fever"],
    organSystem: "cardiovascular",
    severity: "moderate",
    keywords: ["pericarditis", "pericardial inflammation", "pericardial effusion"],
    patterns: [acuteInflammation],
    overrides: {
      ecg: { value: "Diffuse ST elevation with PR depression" },
      troponin: { direction: "high", range: [0.05, 1.5] },
      echocardiogram: { value: "Pericardial effusion" },
      heart_auscultation: { value: "Pericardial friction rub" },
    },
  },

  // ---- 10. Peripheral Arterial Disease ----
  {
    id: "peripheral_arterial_disease",
    name: "Peripheral Arterial Disease",
    chiefComplaints: ["leg pain when walking", "intermittent claudication", "cold feet"],
    organSystem: "cardiovascular",
    severity: "moderate",
    keywords: ["peripheral arterial disease", "pad", "peripheral vascular disease", "pvd", "claudication"],
    patterns: [],
    overrides: {
      bp_systolic: { direction: "high", range: [150, 190] },
      glucose: { direction: "high", range: [110, 180] },
      hba1c: { direction: "high", range: [6.0, 9.0] },
      crp: { direction: "high", range: [5, 30] },
      skin_exam: { value: "Pallor on elevation, dependent rubor, absent pedal pulses" },
      ecg: { value: "Left ventricular hypertrophy" },
    },
  },

  // ---- 11. Supraventricular Tachycardia ----
  {
    id: "supraventricular_tachycardia",
    name: "Supraventricular Tachycardia",
    chiefComplaints: ["palpitations", "dizziness", "chest tightness"],
    organSystem: "cardiovascular",
    severity: "moderate",
    keywords: ["svt", "supraventricular tachycardia", "paroxysmal svt", "psvt"],
    patterns: [tachyarrhythmia],
    overrides: {
      ecg: { value: "Narrow-complex tachycardia, absent P waves, regular rhythm" },
      heart_rate: { direction: "high", range: [150, 220] },
      bp_systolic: { direction: "low", range: [85, 100] },
    },
  },

  // ---- 12. Wolff-Parkinson-White Syndrome ----
  {
    id: "wolff_parkinson_white",
    name: "Wolff-Parkinson-White Syndrome",
    chiefComplaints: ["palpitations", "dizziness", "episodes of rapid heartbeat"],
    organSystem: "cardiovascular",
    severity: "moderate",
    keywords: ["wpw", "wolff-parkinson-white", "pre-excitation", "delta wave", "accessory pathway"],
    patterns: [tachyarrhythmia],
    overrides: {
      ecg: { value: "Short PR interval, delta wave, widened QRS complex" },
      heart_rate: { direction: "high", range: [140, 250] },
      bp_systolic: { direction: "low", range: [80, 100] },
    },
  },

  // ---- 13. Pulmonary Hypertension ----
  {
    id: "pulmonary_hypertension",
    name: "Pulmonary Hypertension",
    chiefComplaints: ["shortness of breath on exertion", "fatigue", "chest pain"],
    organSystem: "cardiovascular",
    severity: "severe",
    keywords: ["pulmonary hypertension", "pah", "pulmonary arterial hypertension", "right heart failure"],
    patterns: [heartFailurePattern],
    overrides: {
      bnp: { direction: "high", range: [200, 3000] },
      echocardiogram: { value: "Right ventricular dilatation, elevated PASP, tricuspid regurgitation" },
      chest_xray: { value: "Enlarged pulmonary arteries, right heart enlargement" },
      spo2: { direction: "low", range: [85, 93] },
      ecg: { value: "Right axis deviation, right ventricular hypertrophy, P pulmonale" },
      heart_auscultation: { value: "Loud P2, tricuspid regurgitation murmur" },
    },
  },

  // ---- 14. Deep Vein Thrombosis ----
  {
    id: "deep_vein_thrombosis",
    name: "Deep Vein Thrombosis",
    chiefComplaints: ["leg swelling", "leg pain", "calf tenderness"],
    organSystem: "cardiovascular",
    severity: "moderate",
    keywords: ["dvt", "deep vein thrombosis", "leg clot", "venous thrombosis", "thromboembolism"],
    patterns: [thrombotic],
    overrides: {
      d_dimer: { direction: "high", range: [1, 8] },
      crp: { direction: "high", range: [5, 40] },
      skin_exam: { value: "Unilateral leg swelling, warmth, erythema, positive Homans sign" },
      heart_rate: { direction: "high", range: [85, 110] },
    },
  },

  // ---- 15. Pulmonary Embolism ----
  {
    id: "pulmonary_embolism",
    name: "Pulmonary Embolism",
    chiefComplaints: ["sudden shortness of breath", "pleuritic chest pain", "haemoptysis"],
    organSystem: "cardiovascular",
    severity: "critical",
    keywords: ["pe", "pulmonary embolism", "lung clot", "thromboembolism"],
    patterns: [thrombotic, respiratoryDistress],
    overrides: {
      d_dimer: { direction: "high", range: [2, 15] },
      ct_angiogram: { value: "Filling defect in pulmonary artery — pulmonary embolism confirmed" },
      heart_rate: { direction: "high", range: [100, 140] },
      troponin: { direction: "high", range: [0.04, 1.0] },
      bnp: { direction: "high", range: [100, 800] },
      ecg: { value: "Sinus tachycardia, S1Q3T3 pattern, right heart strain" },
      spo2: { direction: "low", range: [82, 92] },
      bp_systolic: { direction: "low", range: [80, 100] },
    },
  },
];
