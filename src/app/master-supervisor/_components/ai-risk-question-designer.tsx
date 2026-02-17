"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { masterSupervisorAiRiskQuestionDesigner } from "@/ai/flows/master-supervisor-ai-risk-question-designer-flow";
import { Bot, Clipboard, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

type DesignerOutput = {
  question: string;
  formula: string;
};

export function AIRiskQuestionDesigner() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<DesignerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await masterSupervisorAiRiskQuestionDesigner(description);
      setResult(output);
    } catch (err) {
      setError("Failed to generate question. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Risk Question Designer</CardTitle>
        <CardDescription>
          Use AI to generate risk assessment questions and formulas from a natural language description.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="description">Risk Factor Description</Label>
            <Textarea
              id="description"
              placeholder="e.g., Risk factor if a person consumes alcohol more than 3 times a week."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading || !description}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Generate Question & Formula
              </>
            )}
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex flex-col items-start gap-4">
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {result && (
          <div className="w-full space-y-4 rounded-lg border bg-background p-4">
            <h3 className="font-semibold text-lg">Generated Output</h3>
            <div className="space-y-2">
              <Label htmlFor="generated-question">Generated Question</Label>
              <div className="relative">
                <Input id="generated-question" value={result.question} readOnly />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => copyToClipboard(result.question)}>
                    <Clipboard className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="generated-formula">Generated Formula</Label>
               <div className="relative">
                <Input id="generated-formula" value={result.formula} readOnly className="font-code" />
                 <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => copyToClipboard(result.formula)}>
                    <Clipboard className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
