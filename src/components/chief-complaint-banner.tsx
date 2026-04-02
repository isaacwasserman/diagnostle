interface Props {
  complaint: string;
  turnsRemaining: number;
}

export function ChiefComplaintBanner({ complaint, turnsRemaining }: Props) {
  return (
    <div className="rounded-lg bg-primary/10 border border-primary/30 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-primary uppercase tracking-wide">
            Chief Complaint
          </p>
          <p className="text-base sm:text-lg font-semibold text-foreground mt-1">
            &ldquo;{complaint}&rdquo;
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-muted-foreground">Turns left</p>
          <p className={`text-2xl font-bold ${turnsRemaining <= 2 ? "text-destructive" : "text-foreground"}`}>
            {turnsRemaining}
          </p>
        </div>
      </div>
    </div>
  );
}
