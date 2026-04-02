import { useState } from "react";
import type { DiagnosticTest, TestCategory } from "@/data/types";
import { Button } from "@/components/ui/button";

interface Props {
  availableTests: readonly DiagnosticTest[];
  onSelectTest: (testId: string) => void;
  disabled: boolean;
}

const categoryLabels: Record<TestCategory, string> = {
  vitals: "Vitals",
  cbc: "CBC",
  bmp: "Basic Metabolic",
  liver: "Liver Panel",
  cardiac: "Cardiac Markers",
  coagulation: "Coagulation",
  inflammatory: "Inflammatory",
  urinalysis: "Urinalysis",
  imaging: "Imaging",
  physical_exam: "Physical Exam",
  specialty: "Specialty",
};

const categories: TestCategory[] = [
  "vitals", "cbc", "bmp", "liver", "cardiac", "coagulation",
  "inflammatory", "urinalysis", "imaging", "physical_exam", "specialty",
];

export function TestSelector({ availableTests, onSelectTest, disabled }: Props) {
  const [search, setSearch] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<TestCategory | null>(null);

  const filtered = search
    ? availableTests.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      )
    : availableTests;

  const grouped = new Map<TestCategory, DiagnosticTest[]>();
  for (const test of filtered) {
    const list = grouped.get(test.category) ?? [];
    list.push(test);
    grouped.set(test.category, list);
  }

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Search tests..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
      />
      <div className="space-y-1 max-h-[300px] overflow-y-auto">
        {categories.map((cat) => {
          const testsInCat = grouped.get(cat);
          if (!testsInCat || testsInCat.length === 0) return null;
          const isExpanded = expandedCategory === cat || !!search;

          return (
            <div key={cat}>
              <button
                onClick={() => setExpandedCategory(isExpanded && !search ? null : cat)}
                className="w-full text-left px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide hover:bg-slate-50 rounded"
              >
                {categoryLabels[cat]} ({testsInCat.length})
              </button>
              {isExpanded && (
                <div className="ml-2 space-y-0.5">
                  {testsInCat.map((test) => (
                    <Button
                      key={test.id}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between text-left h-auto py-1.5 px-2"
                      disabled={disabled}
                      onClick={() => onSelectTest(test.id)}
                    >
                      <span className="text-sm">{test.name}</span>
                      <span className="text-xs text-slate-400">
                        {"unit" in test ? test.unit : ""}
                      </span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
