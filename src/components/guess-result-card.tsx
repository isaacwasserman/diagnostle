import type { GuessFeedback } from "@/data/types";
import { Badge } from "@/components/ui/badge";

interface Props {
  guess: string;
  correct: boolean;
  feedback: GuessFeedback;
}

export function GuessResultCard({ guess, correct, feedback }: Props) {
  if (correct) {
    return (
      <div className="rounded-lg border-2 border-green-400 bg-green-50 p-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">&#10003;</span>
          <span className="text-sm font-semibold text-green-800">{guess}</span>
          <Badge className="bg-green-600 text-xs">Correct!</Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">&#10007;</span>
        <span className="text-sm font-semibold text-amber-800">{guess}</span>
        <Badge variant="outline" className="text-xs text-amber-700 border-amber-400">
          Incorrect
        </Badge>
      </div>
      <div className="flex gap-2 flex-wrap">
        <FeedbackPill
          label="Organ System"
          match={feedback.organSystemMatch}
        />
        <FeedbackPill
          label="Severity"
          match={feedback.severityMatch}
        />
        <span className="text-xs text-slate-500 flex items-center gap-1">
          Shared abnormal tests: <strong>{feedback.sharedAbnormalCount}</strong>
        </span>
      </div>
    </div>
  );
}

function FeedbackPill({ label, match }: { label: string; match: boolean }) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${
        match
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {label}: {match ? "Match" : "No match"}
    </span>
  );
}
