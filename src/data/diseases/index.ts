import type { DiseaseDef, DiseaseProfile } from "../types";
import { resolveAll } from "../resolve";

import { diseases as infectious } from "./infectious";
import { diseases as cardiac } from "./cardiac";
import { diseases as gastrointestinal } from "./gastrointestinal";
import { diseases as respiratory } from "./respiratory";
import { diseases as endocrine } from "./endocrine";
import { diseases as neurological } from "./neurological";
import { diseases as other } from "./other";

const allDefs: DiseaseDef[] = [
  ...infectious,
  ...cardiac,
  ...gastrointestinal,
  ...respiratory,
  ...endocrine,
  ...neurological,
  ...other,
];

export const diseaseRegistry: DiseaseProfile[] = resolveAll(allDefs);

export const diseaseMap = new Map(
  diseaseRegistry.map((d) => [d.id, d])
);
