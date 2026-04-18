import { useMemo, useState } from "react";
import type { DiagnosticTest, TestCategory } from "@/data/types";
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
  availableTests: readonly DiagnosticTest[];
  onSelectTest: (testId: string) => void;
  disabled: boolean;
}

const categoryLabels: Record<TestCategory, string> = {
  bmp: "Basic Metabolic Panel",
  cardiac: "Cardiac Markers",
  cbc: "Complete Blood Count",
  coagulation: "Coagulation",
  imaging: "Imaging",
  inflammatory: "Inflammatory / Other",
  liver: "Liver Panel",
  physical_exam: "Physical Exam",
  specialty: "Specialty",
  urinalysis: "Urinalysis",
  vitals: "Vitals",
};

// Alphabetical category order
const categoryOrder: TestCategory[] = [
  "bmp", "cardiac", "cbc", "coagulation", "imaging",
  "inflammatory", "liver", "physical_exam", "specialty",
  "urinalysis", "vitals",
];

export function TestSelector({ availableTests, onSelectTest, disabled }: Props) {
  const [search, setSearch] = useState("");

  const grouped = useMemo(() => {
    const map = new Map<TestCategory, DiagnosticTest[]>();
    for (const test of availableTests) {
      const list = map.get(test.category) ?? [];
      list.push(test);
      map.set(test.category, list);
    }
    // Sort tests alphabetically within each category
    for (const [, list] of map) {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return map;
  }, [availableTests]);

  const sortedAll = useMemo(
    () => [...availableTests].sort((a, b) => a.name.localeCompare(b.name)),
    [availableTests]
  );

  const isSearching = search.trim().length > 0;

  return (
    <Card className="overflow-hidden py-1 flex-1 flex flex-col min-h-72 h-0">
      <Command>
        <CommandInput
          placeholder="Search tests..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No tests found.</CommandEmpty>
          {isSearching
            ? sortedAll.map((test) => (
                <CommandItem
                  key={test.id}
                  value={`${test.name} ${categoryLabels[test.category]}`}
                  disabled={disabled}
                  onSelect={() => onSelectTest(test.id)}
                >
                  <span className="flex-1 truncate">{test.name}</span>
                  {"unit" in test && (
                    <span className="text-xs text-muted-foreground ml-2 shrink-0">
                      {test.unit}
                    </span>
                  )}
                </CommandItem>
              ))
            : categoryOrder.map((cat) => {
                const testsInCat = grouped.get(cat);
                if (!testsInCat || testsInCat.length === 0) return null;
                return (
                  <CommandGroup key={cat} heading={categoryLabels[cat]}>
                    {testsInCat.map((test) => (
                      <CommandItem
                        key={test.id}
                        value={`${test.name} ${categoryLabels[test.category]}`}
                        disabled={disabled}
                        onSelect={() => onSelectTest(test.id)}
                      >
                        <span className="flex-1 truncate">{test.name}</span>
                        {"unit" in test && (
                          <span className="text-xs text-muted-foreground ml-2 shrink-0">
                            {test.unit}
                          </span>
                        )}
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
