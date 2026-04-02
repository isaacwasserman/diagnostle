import type { ResolvedTestResult } from "@/data/types";
import { Badge } from "@/components/ui/badge";

interface Props {
  result: ResolvedTestResult;
}

export function TestResultCard({ result }: Props) {
  return (
    <div className={`rounded-lg border p-3 ${result.abnormal ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700 truncate">
              {result.testName}
            </span>
            {result.abnormal && (
              <Badge variant="destructive" className="text-xs shrink-0">
                Abnormal
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{result.category}</p>
        </div>
        <div className="text-right shrink-0">
          <p className={`text-sm font-mono font-semibold ${result.abnormal ? "text-red-700" : "text-slate-600"}`}>
            {typeof result.value === "number"
              ? `${result.value} ${result.unit ?? ""}`
              : result.value}
          </p>
          {result.normalRange && (
            <p className="text-xs text-slate-400">{result.normalRange.label}</p>
          )}
        </div>
      </div>
    </div>
  );
}
