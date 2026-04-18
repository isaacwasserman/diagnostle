import type { DiseaseDef } from "../types";
import {
  obstructiveAirway,
  malignancy,
  respiratoryDistress,
  acuteInflammation,
  chronicInflammation,
} from "../patterns";

export const diseases: DiseaseDef[] = [
  {
    id: "asthma",
    name: "Asthma",
    chiefComplaints: ["shortness of breath", "wheeze", "chest tightness"],
    organSystem: "respiratory",
    severity: "moderate",
    keywords: ["asthma", "bronchospasm", "wheeze", "inhaler"],
    patterns: [obstructiveAirway],
    overrides: {
      spirometry: {
        value:
          "Obstructive pattern — reduced FEV1/FVC ratio, reversible with bronchodilator",
      },
    },
  },
  {
    id: "copd",
    name: "COPD",
    chiefComplaints: [
      "shortness of breath",
      "chronic cough",
      "sputum production",
    ],
    organSystem: "respiratory",
    severity: "moderate",
    keywords: ["copd", "emphysema", "chronic bronchitis", "smoking"],
    patterns: [obstructiveAirway],
    overrides: {
      haemoglobin: { direction: "high", range: [17.5, 20] },
      spirometry: {
        value:
          "Obstructive pattern — reduced FEV1/FVC ratio, not fully reversible",
      },
      sputum_culture: {
        value: "Mixed respiratory flora, possible Haemophilus influenzae",
      },
    },
  },
  {
    id: "bronchiectasis",
    name: "Bronchiectasis",
    chiefComplaints: [
      "chronic cough",
      "sputum production",
      "recurrent chest infections",
    ],
    organSystem: "respiratory",
    severity: "moderate",
    keywords: ["bronchiectasis", "dilated airways", "chronic sputum"],
    patterns: [chronicInflammation],
    overrides: {
      chest_xray: { value: "Bronchial wall thickening, tram-track sign" },
      lung_auscultation: { value: "Coarse crackles, scattered wheeze" },
      wbc: { direction: "high", range: [11, 18] },
      spirometry: { value: "Obstructive pattern with air trapping" },
      sputum_culture: {
        value: "Pseudomonas aeruginosa or Haemophilus influenzae",
      },
      ct_chest: {
        value:
          "Dilated bronchi, bronchial wall thickening, signet ring sign",
      },
    },
  },
  {
    id: "idiopathic_pulmonary_fibrosis",
    name: "Idiopathic pulmonary fibrosis",
    chiefComplaints: [
      "progressive shortness of breath",
      "dry cough",
      "fatigue",
    ],
    organSystem: "respiratory",
    severity: "severe",
    keywords: [
      "pulmonary fibrosis",
      "ipf",
      "interstitial lung disease",
      "honeycombing",
    ],
    patterns: [respiratoryDistress],
    overrides: {
      chest_xray: {
        value: "Bilateral reticular opacities, honeycombing",
      },
      lung_auscultation: {
        value: "Bilateral fine inspiratory crackles",
      },
      spirometry: {
        value:
          "Restrictive pattern — reduced FVC, preserved FEV1/FVC ratio",
      },
      ct_chest: {
        value: "Bilateral basal honeycombing, UIP pattern",
      },
    },
  },
  {
    id: "pleurisy",
    name: "Pleurisy",
    chiefComplaints: [
      "sharp chest pain on breathing",
      "pleuritic pain",
      "shortness of breath",
    ],
    organSystem: "respiratory",
    severity: "moderate",
    keywords: ["pleurisy", "pleuritis", "pleural inflammation"],
    patterns: [acuteInflammation],
    overrides: {
      chest_xray: { value: "Pleural effusion or pleural thickening" },
      lung_auscultation: { value: "Pleural friction rub" },
    },
  },
  {
    id: "pneumothorax",
    name: "Pneumothorax",
    chiefComplaints: [
      "sudden chest pain",
      "shortness of breath",
      "pleuritic pain",
    ],
    organSystem: "respiratory",
    severity: "severe",
    keywords: ["pneumothorax", "collapsed lung", "air leak"],
    patterns: [],
    overrides: {
      chest_xray: {
        value: "Visible lung edge, absent lung markings peripherally",
      },
      lung_auscultation: {
        value: "Absent breath sounds on affected side",
      },
      spo2: { direction: "low", range: [85, 94] },
      respiratory_rate: { direction: "high", range: [22, 32] },
      heart_rate: { direction: "high", range: [100, 130] },
      ct_chest: {
        value: "Pneumothorax confirmed, lung collapse quantified",
      },
    },
  },
  {
    id: "lung_cancer",
    name: "Lung cancer",
    chiefComplaints: [
      "persistent cough",
      "haemoptysis",
      "weight loss",
      "shortness of breath",
    ],
    organSystem: "respiratory",
    severity: "severe",
    keywords: ["lung cancer", "bronchogenic carcinoma", "lung mass"],
    patterns: [malignancy, respiratoryDistress],
    overrides: {
      chest_xray: { value: "Lung mass or nodule identified" },
      ct_chest: {
        value: "Lung mass with mediastinal lymphadenopathy",
      },
      sputum_culture: {
        value: "Possible malignant cells on cytology",
      },
    },
  },
  {
    id: "mesothelioma",
    name: "Mesothelioma",
    chiefComplaints: ["chest pain", "shortness of breath", "weight loss"],
    organSystem: "respiratory",
    severity: "severe",
    keywords: ["mesothelioma", "asbestos", "pleural malignancy"],
    patterns: [malignancy, respiratoryDistress],
    overrides: {
      chest_xray: {
        value: "Pleural thickening or effusion, possible pleural mass",
      },
      ct_chest: {
        value: "Pleural thickening with calcified plaques",
      },
    },
  },
  {
    id: "cystic_fibrosis",
    name: "Cystic fibrosis",
    chiefComplaints: [
      "chronic productive cough",
      "recurrent chest infections",
      "failure to thrive",
    ],
    organSystem: "respiratory",
    severity: "severe",
    keywords: ["cystic fibrosis", "cf", "mucoviscidosis", "thick mucus"],
    patterns: [obstructiveAirway, chronicInflammation],
    overrides: {
      glucose: { direction: "high", range: [110, 300] },
      sputum_culture: { value: "Pseudomonas aeruginosa isolated" },
      spirometry: {
        value: "Obstructive pattern — progressive decline in FEV1",
      },
      stool_sample: {
        value: "Elevated faecal elastase, steatorrhoea",
      },
    },
  },
  {
    id: "ards",
    name: "ARDS (Acute Respiratory Distress Syndrome)",
    chiefComplaints: [
      "severe breathlessness",
      "rapid breathing",
      "confusion",
    ],
    organSystem: "respiratory",
    severity: "critical",
    keywords: [
      "ards",
      "acute respiratory distress",
      "bilateral infiltrates",
      "ali",
    ],
    patterns: [respiratoryDistress],
    overrides: {
      spo2: { direction: "low", range: [60, 85] },
      respiratory_rate: { direction: "high", range: [28, 45] },
      chest_xray: {
        value: "Bilateral diffuse opacities, white-out",
      },
      ct_chest: {
        value:
          "Bilateral ground-glass opacities with dependent consolidation",
      },
      lung_auscultation: {
        value: "Bilateral crackles throughout",
      },
      lactate: { direction: "high", range: [2.5, 6] },
      crp: { direction: "high", range: [50, 200] },
      fibrinogen: { direction: "high", range: [400, 800] },
    },
  },
  {
    id: "pulmonary_oedema",
    name: "Pulmonary oedema (cardiogenic)",
    chiefComplaints: [
      "orthopnoea",
      "pink frothy sputum",
      "severe shortness of breath",
    ],
    organSystem: "respiratory",
    severity: "severe",
    keywords: [
      "pulmonary oedema",
      "flash pulmonary oedema",
      "acute heart failure",
    ],
    patterns: [respiratoryDistress],
    overrides: {
      bnp: { direction: "high", range: [500, 5000] },
      chest_xray: {
        value:
          "Bilateral alveolar oedema, Kerley B lines, upper lobe venous diversion",
      },
      lung_auscultation: {
        value: "Bilateral crackles to mid-zones",
      },
      heart_rate: { direction: "high", range: [100, 130] },
      echocardiogram: {
        value: "Reduced ejection fraction, valvular abnormality",
      },
      ecg: {
        value: "Possible ischaemic changes or arrhythmia",
      },
      troponin: { direction: "high", range: [0.04, 1.0] },
    },
  },
];
