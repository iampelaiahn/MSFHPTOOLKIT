'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateHealthEducationContent, GenerateHealthEducationInput } from "@/ai/flows/community-microplanner-ai-health-education-assistant-flow";
import { Bot, Loader2, ListOrdered } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function HealthEducationAssistant() {
  const [formData, setFormData] = useState<GenerateHealthEducationInput>({
    riskProfile: "",
    needs: "",
    kpDemographics: "",
  });
  const [result, setResult] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.riskProfile || !formData.needs || !formData.kpDemographics) {
        setError("Please fill out all fields.");
        return;
    };

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await generateHealthEducationContent(formData);
      setResult(output.educationPoints);
    } catch (err) {
      setError("Failed to generate content. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  return (
    <Card id="education">
      <CardHeader>
        <CardTitle>AI Health Education Assistant</CardTitle>
        <CardDescription>
          Generate culturally sensitive and personalized health education talking points or interactive questions for Community-Based Microplanners.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="kpDemographics">Key Population Demographics</Label>
            <Textarea
              id="kpDemographics"
              placeholder='e.g., "25-year-old male, identifies as LGBTQ+, speaks Swahili, lives in an urban setting."'
              value={formData.kpDemographics}
              onChange={handleInputChange}
              disabled={isLoading}
              rows={3}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="riskProfile">Risk Profile</Label>
            <Textarea
              id="riskProfile"
              placeholder='e.g., "High risk due to substance use and multiple partners."'
              value={formData.riskProfile}
              onChange={handleInputChange}
              disabled={isLoading}
              rows={3}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="needs">Specific Health Needs</Label>
            <Textarea
              id="needs"
              placeholder='e.g., "Condom negotiation skills, STI prevention, mental health support."'
              value={formData.needs}
              onChange={handleInputChange}
              disabled={isLoading}
              rows={3}
            />
          </div>
          <Button type="submit" disabled={isLoading || !formData.riskProfile || !formData.needs || !formData.kpDemographics}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Generate Talking Points
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
            <h3 className="font-semibold text-lg flex items-center gap-2"><ListOrdered /> Generated Talking Points</h3>
            <ul className="space-y-2 list-disc pl-5">
              {result.map((point, index) => (
                <li key={index} className="text-sm text-foreground/90">{point}</li>
              ))}
            </ul>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
