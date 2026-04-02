interface Props {
  complaint: string;
  turnsRemaining: number;
}

export function ChiefComplaintBanner({ complaint, turnsRemaining }: Props) {
  return (
    <div className="rounded-lg bg-teal-50 border border-teal-200 p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-teal-600 uppercase tracking-wide">
            Chief Complaint
          </p>
          <p className="text-lg font-semibold text-teal-900 mt-1">
            "{complaint}"
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Turns remaining</p>
          <p className={`text-2xl font-bold ${turnsRemaining <= 2 ? "text-red-600" : "text-slate-700"}`}>
            {turnsRemaining}
          </p>
        </div>
      </div>
    </div>
  );
}
