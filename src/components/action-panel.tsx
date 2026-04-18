import type { DiagnosticTest, DiseaseProfile } from "@/data/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FlaskConical, Lightbulb } from "lucide-react";
import { TestSelector } from "./test-selector";
import { GuessInput } from "./guess-input";

interface Props {
  availableTests: readonly DiagnosticTest[];
  diseases: readonly DiseaseProfile[];
  onSelectTest: (testId: string) => void;
  onGuess: (diseaseId: string) => void;
  disabled: boolean;
}

export function ActionPanel({ availableTests, diseases, onSelectTest, onGuess, disabled }: Props) {
  return (
    <Tabs defaultValue="test" className="w-full flex-1 flex flex-col min-h-0">
      <TabsList className="w-full">
        <TabsTrigger value="test" className="flex-1"><FlaskConical className="size-4" /> Run Test</TabsTrigger>
        <TabsTrigger value="guess" className="flex-1"><Lightbulb className="size-4" /> Guess Diagnosis</TabsTrigger>
      </TabsList>
      <TabsContent value="test" className="flex flex-col min-h-0">
        <TestSelector
          availableTests={availableTests}
          onSelectTest={onSelectTest}
          disabled={disabled}
        />
      </TabsContent>
      <TabsContent value="guess" className="flex flex-col min-h-0">
        <GuessInput
          diseases={diseases}
          onGuess={onGuess}
          disabled={disabled}
        />
      </TabsContent>
    </Tabs>
  );
}
