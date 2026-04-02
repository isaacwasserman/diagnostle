import type { DiagnosticTest, DiseaseProfile } from "@/data/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
    <Tabs defaultValue="test" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="test" className="flex-1">Run Test</TabsTrigger>
        <TabsTrigger value="guess" className="flex-1">Guess Diagnosis</TabsTrigger>
      </TabsList>
      <TabsContent value="test">
        <TestSelector
          availableTests={availableTests}
          onSelectTest={onSelectTest}
          disabled={disabled}
        />
      </TabsContent>
      <TabsContent value="guess">
        <GuessInput
          diseases={diseases}
          onGuess={onGuess}
          disabled={disabled}
        />
      </TabsContent>
    </Tabs>
  );
}
