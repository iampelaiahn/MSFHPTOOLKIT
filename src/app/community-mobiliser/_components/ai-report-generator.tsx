'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAiReportInsights, WeeklyReportInput, WeeklyReportOutput } from "@/ai/flows/community-mobiliser-ai-report-insights-flow";
import { Bot, Loader2, Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export function AIReportGenerator() {
  const [formData, setFormData] = useState<WeeklyReportInput>({
    weeklyReportData: "",
    historicalContext: "",
  });
  const [result, setResult] = useState<WeeklyReportOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.weeklyReportData) {
        setError("Please provide the weekly report data.");
        return;
    };

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await getAiReportInsights(formData);
      setResult(output);
    } catch (err) {
      setError("Failed to generate insights. Please try again.");
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
    <Card>
      <CardHeader>
        <CardTitle>AI Report Insights</CardTitle>
        <CardDescription>
          Generate summaries and actionable insights from weekly performance reports.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="weeklyReportData">Weekly Performance Report Data</Label>
            <Textarea
              id="weeklyReportData"
              placeholder="Paste the raw text of the weekly performance report here..."
              value={formData.weeklyReportData}
              onChange={handleInputChange}
              disabled={isLoading}
              rows={10}
              required
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="historicalContext">Historical Context (Optional)</Label>
            <Textarea
              id="historicalContext"
              placeholder="Provide any historical data or context from previous reports to aid in trend analysis..."
              value={formData.historicalContext || ''}
              onChange={handleInputChange}
              disabled={isLoading}
              rows={5}
            />
          </div>
          <Button type="submit" disabled={isLoading || !formData.weeklyReportData}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Insights...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Generate Insights
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
          <div className="w-full space-y-6 rounded-lg border bg-background p-6">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Generated Report Insights</h3>
                <p className="text-sm text-muted-foreground">{result.summary}</p>
            </div>
            
            <Separator />
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-lg flex items-center gap-2"><TrendingUp /> Key Trends</h4>
                <ul className="space-y-2 list-disc pl-5">
                  {result.keyTrends.map((point, index) => (
                    <li key={`trend-${index}`} className="text-sm text-foreground/90">{point}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-lg flex items-center gap-2"><AlertTriangle /> Areas for Attention</h4>
                <ul className="space-y-2 list-disc pl-5">
                  {result.areasNeedingAttention.map((point, index) => (
                    <li key={`attention-${index}`} className="text-sm text-foreground/90">{point}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-lg flex items-center gap-2"><Lightbulb /> Actionable Insights</h4>
                <ul className="space-y-2 list-disc pl-5">
                  {result.actionableInsights.map((point, index) => (
                    <li key={`insight-${index}`} className="text-sm text-foreground/90">{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
