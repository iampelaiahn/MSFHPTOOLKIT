'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAiReportInsights, WeeklyReportInput, WeeklyReportOutput } from "@/ai/flows/community-mobiliser-ai-report-insights-flow";
import { Bot, Loader2, Lightbulb, TrendingUp, AlertTriangle, FileWarning, CheckCircle, Activity, Link as LinkIcon, Users, MapPin, Package } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";


export function AIReportGenerator() {
  const [result, setResult] = useState<WeeklyReportOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    // In a real application, this data would be fetched from various services/APIs.
    // Here, we use mock data that demonstrates the AI's cross-checking capabilities.
    const mockReportInput: WeeklyReportInput = {
        communityData: {
            peopleTested: 200,
            hivstKitsDistributed: 200,
            referralsMade: 150,
        },
        facilityData: {
            referralsReconciled: 100, // Linkage rate is 100/150 = 66.7%, which is < 75%
        },
        inventoryData: {
            hivstKitsDispensed: 215, // Mismatch: 215 kits dispensed vs. 200 people tested
        },
        geospatialData: {
            hotspotCoverage: "88%",
        }
    };

    try {
      const output = await getAiReportInsights(mockReportInput);
      setResult(output);
    } catch (err) {
      setError("Failed to generate insights. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Weekly Report Generator</CardTitle>
        <CardDescription>
          Automatically synthesize data from community, facility, and inventory modules to generate a comprehensive performance report with actionable insights.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Data...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Generate Weekly Report
              </>
            )}
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex flex-col items-start gap-4">
        {error && (
            <Alert variant="destructive">
                <FileWarning className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {result && (
          <div className="w-full space-y-6 rounded-lg border bg-background p-6">
            <div>
                <h3 className="text-xl font-semibold flex items-center gap-2"><Activity /> Weekly Performance Summary</h3>
                <p className="text-sm text-muted-foreground mt-2">{result.summary}</p>
            </div>
            
            {result.dataDiscrepancies && result.dataDiscrepancies.length > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Data Discrepancies Found!</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 mt-2">
                    {result.dataDiscrepancies.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
                <h4 className="font-semibold text-lg flex items-center gap-2"><TrendingUp /> Key Metrics</h4>
                 <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Metric</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Insight</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.keyMetrics.map((item) => (
                      <TableRow key={item.metric}>
                        <TableCell className="font-medium">{item.metric}</TableCell>
                        <TableCell>
                          <Badge variant={item.metric === 'Linkage Rate' && parseFloat(item.value.split('(')[1]) < 75 ? 'destructive' : 'secondary'}>{item.value}</Badge>
                        </TableCell>
                        <TableCell>{item.insight || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
        )}
      </CardFooter>
    </Card>
  );
}
