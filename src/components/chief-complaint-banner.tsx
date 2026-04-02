import { Stethoscope } from "lucide-react";

interface Props {
  complaint: string;
  dateStr: string;
}

export function ChiefComplaintBanner({ complaint, dateStr }: Props) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const displayDate = new Date(y!, m! - 1, d!).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl bg-primary px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-semibold text-primary-foreground/70 uppercase tracking-widest">
          Chief Complaint
        </p>
        <p className="text-[11px] font-medium text-primary-foreground/50">
          {displayDate}
        </p>
      </div>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20">
          <Stethoscope className="size-4 text-primary-foreground" />
        </div>
        <p className="text-base sm:text-lg font-semibold text-primary-foreground mt-0.5 leading-snug">
          &ldquo;{complaint}&rdquo;
        </p>
      </div>
    </div>
  );
}
