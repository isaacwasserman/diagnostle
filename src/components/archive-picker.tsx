import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { todayDateStr } from "@/game/daily";

interface Props {
  dateStr: string;
  onDateChange: (dateStr: string) => void;
}

const LAUNCH_DATE = new Date("2026-04-01T00:00:00");

function toUTCDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y!, m! - 1, d!);
}

function fromDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function ArchivePicker({ dateStr, onDateChange }: Props) {
  const today = todayDateStr();
  const isToday = dateStr === today;
  const selected = toUTCDate(dateStr);
  const todayDate = toUTCDate(today);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs text-muted-foreground"
          aria-label="Select puzzle date"
        >
          <CalendarDays className="size-3.5" />
          {isToday ? "Today" : formatLabel(dateStr)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            if (date) onDateChange(fromDate(date));
          }}
          disabled={(date) => date > todayDate || date < LAUNCH_DATE}
          defaultMonth={selected}
          initialFocus
        />
        {!isToday && (
          <div className="border-t px-3 py-2">
            <Button
              variant="link"
              size="xs"
              className="w-full"
              onClick={() => onDateChange(today)}
            >
              Back to today's puzzle
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

function formatLabel(dateStr: string): string {
  const d = toUTCDate(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
