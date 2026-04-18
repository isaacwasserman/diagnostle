import type { AbnormalSpec, DiseaseDef, DiseaseProfile } from "./types"

export function resolveDisease(def: DiseaseDef): DiseaseProfile {
  const merged: Record<string, AbnormalSpec> = {}

  for (const pattern of def.patterns) {
    Object.assign(merged, pattern.abnormals)
  }

  if (def.overrides) {
    Object.assign(merged, def.overrides)
  }

  if (def.remove) {
    for (const id of def.remove) {
      delete merged[id]
    }
  }

  return {
    id: def.id,
    name: def.name,
    chiefComplaints: def.chiefComplaints,
    organSystem: def.organSystem,
    severity: def.severity,
    keywords: def.keywords,
    abnormals: new Map(Object.entries(merged)),
  }
}

export function resolveAll(defs: readonly DiseaseDef[]): DiseaseProfile[] {
  return defs.map(resolveDisease)
}
