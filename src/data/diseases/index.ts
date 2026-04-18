import { resolveAll } from "../resolve"
import type { DiseaseDef, DiseaseProfile } from "../types"
import { diseases as cardiac } from "./cardiac"
import { diseases as endocrine } from "./endocrine"
import { diseases as gastrointestinal } from "./gastrointestinal"
import { diseases as infectious } from "./infectious"
import { diseases as neurological } from "./neurological"
import { diseases as other } from "./other"
import { diseases as respiratory } from "./respiratory"

const allDefs: DiseaseDef[] = [
  ...infectious,
  ...cardiac,
  ...gastrointestinal,
  ...respiratory,
  ...endocrine,
  ...neurological,
  ...other,
]

export const diseaseRegistry: DiseaseProfile[] = resolveAll(allDefs)

export const diseaseMap = new Map(diseaseRegistry.map((d) => [d.id, d]))
