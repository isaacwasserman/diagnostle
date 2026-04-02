import { useState } from "react";
import { Header } from "@/components/header";
import { GameBoard } from "@/components/game-board";
import { Toaster } from "@/components/ui/sonner";
import { diseaseRegistry } from "@/data/diseases";
import { todayDateStr } from "@/game/daily";

function App() {
  const [dateStr, setDateStr] = useState(() => todayDateStr());

  return (
    <div className="min-h-screen bg-background">
      <Header dateStr={dateStr} onDateChange={setDateStr} />
      <GameBoard diseases={diseaseRegistry} dateStr={dateStr} />
      <Toaster />
    </div>
  );
}

export default App;
