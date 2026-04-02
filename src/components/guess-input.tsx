import { useMemo, useState } from "react";
import type { DiseaseProfile } from "@/data/types";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Card } from "@/components/ui/card";

interface Props {
  diseases: readonly DiseaseProfile[];
  onGuess: (diseaseId: string) => void;
  disabled: boolean;
}

const organSystemLabels: Record<string, string> = {
  blood_immune: "Blood & Immune",
  cancer: "Cancer",
  cardiovascular: "Cardiovascular",
  endocrine: "Endocrine & Metabolic",
  gastrointestinal: "Gastrointestinal",
  haematological: "Haematological",
  infectious: "Infectious",
  musculoskeletal: "Musculoskeletal",
  neurological: "Neurological",
  other: "Other",
  renal: "Renal & Urinary",
  reproductive: "Reproductive",
  respiratory: "Respiratory",
  skin: "Skin",
};

export function GuessInput({ diseases, onGuess, disabled }: Props) {
  const [search, setSearch] = useState("");

  const grouped = useMemo(() => {
    const map = new Map<string, DiseaseProfile[]>();
    for (const d of diseases) {
      const list = map.get(d.organSystem) ?? [];
      list.push(d);
      map.set(d.organSystem, list);
    }
    // Sort diseases alphabetically within each group
    for (const [, list] of map) {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return map;
  }, [diseases]);

  // Sort organ system keys alphabetically by label
  const sortedSystems = useMemo(
    () =>
      [...grouped.keys()].sort((a, b) =>
        (organSystemLabels[a] ?? a).localeCompare(organSystemLabels[b] ?? b)
      ),
    [grouped]
  );

  const sortedAll = useMemo(
    () => [...diseases].sort((a, b) => a.name.localeCompare(b.name)),
    [diseases]
  );

  const isSearching = search.trim().length > 0;

  return (
    <Card className="overflow-hidden py-1">
      <Command>
        <CommandInput
          placeholder="Search diseases..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No diseases found.</CommandEmpty>
          {isSearching
            ? sortedAll.map((d) => (
                <CommandItem
                  key={d.id}
                  value={`${d.name} ${d.keywords.join(" ")}`}
                  disabled={disabled}
                  onSelect={() => onGuess(d.id)}
                >
                  {d.name}
                </CommandItem>
              ))
            : sortedSystems.map((system) => {
                const diseasesInSystem = grouped.get(system);
                if (!diseasesInSystem || diseasesInSystem.length === 0)
                  return null;
                return (
                  <CommandGroup
                    key={system}
                    heading={organSystemLabels[system] ?? system}
                  >
                    {diseasesInSystem.map((d) => (
                      <CommandItem
                        key={d.id}
                        value={`${d.name} ${d.keywords.join(" ")}`}
                        disabled={disabled}
                        onSelect={() => onGuess(d.id)}
                      >
                        {d.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
        </CommandList>
      </Command>
    </Card>
  );
}
