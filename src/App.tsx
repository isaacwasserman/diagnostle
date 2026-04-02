import { Header } from "@/components/header";
import { GameBoard } from "@/components/game-board";
import { Toaster } from "@/components/ui/sonner";
import { diseaseRegistry } from "@/data/diseases";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <GameBoard diseases={diseaseRegistry} />
      <Toaster />
    </div>
  );
}

export default App;
