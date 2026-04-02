import { useState } from "react";
import type { DiseaseProfile } from "@/data/types";
import { Button } from "@/components/ui/button";

interface Props {
  diseases: readonly DiseaseProfile[];
  onGuess: (diseaseId: string) => void;
  disabled: boolean;
}

export function GuessInput({ diseases, onGuess, disabled }: Props) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = search.length > 0
    ? diseases.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()))
      )
    : diseases;

  const selectedName = diseases.find((d) => d.id === selectedId)?.name;

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Search diseases..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedId(null);
        }}
        className="w-full px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
      />

      <div className="max-h-[250px] overflow-y-auto space-y-0.5">
        {filtered.slice(0, 50).map((d) => (
          <button
            key={d.id}
            onClick={() => {
              setSelectedId(d.id);
              setSearch(d.name);
            }}
            className={`w-full text-left px-3 py-1.5 text-sm rounded hover:bg-slate-50 transition-colors ${
              selectedId === d.id ? "bg-teal-50 text-teal-700 font-medium" : "text-slate-700"
            }`}
          >
            {d.name}
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-4">No matching diseases</p>
        )}
        {filtered.length > 50 && (
          <p className="text-xs text-slate-400 text-center py-1">
            Type to narrow results...
          </p>
        )}
      </div>

      {selectedId && (
        <Button
          className="w-full"
          disabled={disabled}
          onClick={() => {
            onGuess(selectedId);
            setSearch("");
            setSelectedId(null);
          }}
        >
          Guess: {selectedName}
        </Button>
      )}
    </div>
  );
}
