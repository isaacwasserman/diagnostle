import { useState } from "react";
import { Header } from "@/components/header";
import { GameBoard } from "@/components/game-board";
import { Toaster } from "@/components/ui/sonner";
import { diseaseRegistry } from "@/data/diseases";
import { todayDateStr } from "@/game/daily";

function App() {
  const [dateStr, setDateStr] = useState(() => todayDateStr());

  return (
    <div className="h-[100dvh] bg-background grid grid-rows-[auto_1fr] overflow-auto">
      <Header dateStr={dateStr} onDateChange={setDateStr} />
      <GameBoard diseases={diseaseRegistry} dateStr={dateStr} />
      <Toaster />
    </div>
  );
}

export default App;
