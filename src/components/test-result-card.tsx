import type { ResolvedTestResult } from "@/data/types";
import { Badge } from "@/components/ui/badge";

interface Props {
  result: ResolvedTestResult;
}

export function TestResultCard({ result }: Props) {
  const isNumeric = typeof result.value === "number";

  return (
    <div className={`rounded-lg border p-3 ${result.abnormal ? "border-destructive/30 bg-destructive/10" : "border-border bg-card"}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">
              {result.testName}
            </span>
            {result.abnormal && (
              <Badge variant="destructive" className="text-xs shrink-0">
                Abnormal
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{result.category}</p>
        </div>
        {isNumeric && (
          <div className="text-right shrink-0">
            <p className={`text-sm font-mono font-semibold ${result.abnormal ? "text-destructive" : "text-foreground"}`}>
              {result.value} {result.unit ?? ""}
            </p>
            {result.normalRange && (
              <p className="text-xs text-muted-foreground">{result.normalRange.label}</p>
            )}
          </div>
        )}
      </div>
      {!isNumeric && (
        <p className={`text-sm mt-1.5 ${result.abnormal ? "text-destructive font-medium" : "text-foreground"}`}>
          {result.value}
        </p>
      )}
    </div>
  );
}
