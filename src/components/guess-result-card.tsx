import { Badge } from "@/components/ui/badge"
import type { GuessFeedback } from "@/data/types"

interface Props {
  guess: string
  correct: boolean
  feedback: GuessFeedback
}

export function GuessResultCard({ guess, correct, feedback }: Props) {
  if (correct) {
    return (
      <div className="rounded-lg border-2 border-primary bg-primary/10 p-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">&#10003;</span>
          <span className="text-sm font-semibold text-foreground">{guess}</span>
          <Badge className="text-xs">Correct!</Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-muted/50 p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">&#10007;</span>
        <span className="text-sm font-semibold text-foreground">{guess}</span>
        <Badge variant="outline" className="text-xs">
          Incorrect
        </Badge>
      </div>
      <div className="flex gap-2 flex-wrap">
        <FeedbackPill label="Organ System" match={feedback.organSystemMatch} />
        <FeedbackPill label="Severity" match={feedback.severityMatch} />
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          Shared abnormal tests: <strong>{feedback.sharedAbnormalCount}</strong>
        </span>
      </div>
    </div>
  )
}

function FeedbackPill({ label, match }: { label: string; match: boolean }) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${
        match
          ? "bg-primary/15 text-primary"
          : "bg-destructive/15 text-destructive"
      }`}
    >
      {label}: {match ? "Match" : "No match"}
    </span>
  )
}
