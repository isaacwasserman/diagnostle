import { Activity, CircleHelp, Monitor, Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArchivePicker } from "./archive-picker"

type Theme = "light" | "dark" | "system"

const iconButtonClass =
  "flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"

interface HeaderProps {
  dateStr: string
  onDateChange: (dateStr: string) => void
}

export function Header({ dateStr, onDateChange }: HeaderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system"
    return (localStorage.getItem("theme") as Theme) ?? "system"
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === "system") {
      localStorage.removeItem("theme")
      root.classList.remove("dark", "light")
    } else {
      localStorage.setItem("theme", theme)
      root.classList.toggle("dark", theme === "dark")
      root.classList.toggle("light", theme === "light")
    }
  }, [theme])

  const cycle = () =>
    setTheme((t) =>
      t === "system" ? "dark" : t === "dark" ? "light" : "system",
    )

  return (
    <header className="flex items-center justify-between py-4 px-4">
      <div className="flex items-center gap-2">
        <Activity className="size-5 text-primary" />
        <h1
          style={{ fontFamily: "'Bungee', cursive" }}
          className="text-xl text-primary tracking-wide"
        >
          Diagnostle
        </h1>
      </div>
      <div className="flex items-center gap-1">
        <ArchivePicker dateStr={dateStr} onDateChange={onDateChange} />
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className={iconButtonClass}
              aria-label="How to play"
            >
              <CircleHelp className="size-4" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to Play</DialogTitle>
              <DialogDescription>
                Diagnose the mystery patient in 6 turns or fewer.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 text-sm text-foreground">
              <p>
                Each day you're presented with a patient's{" "}
                <strong>chief complaint</strong>. Your job is to figure out the
                underlying diagnosis.
              </p>
              <p className="font-medium">On each turn you can either:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Run a test</strong> &mdash; order a lab, imaging, or
                  physical exam to gather clues. Results will show whether
                  values are normal or abnormal.
                </li>
                <li>
                  <strong>Guess a diagnosis</strong> &mdash; pick from the list
                  of possible diseases. You'll get feedback on whether the organ
                  system and severity match, plus how many abnormal tests
                  overlap.
                </li>
              </ul>
              <p>
                You have <strong>6 turns</strong> total. Use tests wisely to
                narrow down the possibilities, then lock in your diagnosis.
              </p>
              <p className="text-muted-foreground text-xs">
                A new puzzle is available every day.
              </p>
            </div>
          </DialogContent>
        </Dialog>
        <button
          type="button"
          onClick={cycle}
          className={iconButtonClass}
          aria-label={`Theme: ${theme}`}
        >
          {theme === "dark" ? (
            <Moon className="size-4" />
          ) : theme === "light" ? (
            <Sun className="size-4" />
          ) : (
            <Monitor className="size-4" />
          )}
        </button>
      </div>
    </header>
  )
}
