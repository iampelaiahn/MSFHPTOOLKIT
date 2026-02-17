'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShieldCheck, TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const questions = [
  { id: "age", text: "Age", options: ["<25", ">=25"], points: { "<25": 1, ">=25": 0 } },
  { id: "sexWork", text: "Duration in Sex Work", options: ["<2 years", ">=2 years"], points: { "<2 years": 0, ">=2 years": 1 } },
  { id: "clientVolume", text: "Client Volume/Week", options: ["<10", ">=10"], points: { "<10": 0, ">=10": 1 } },
  { id: "condoms", text: "Consistent Condom Use", options: ["Yes", "No"], points: { "Yes": 0, "No": 1 } },
  { id: "substances", text: "Substance Use during Sex", options: ["Never", "Sometimes/Always"], points: { "Never": 0, "Sometimes/Always": 1 } },
  { id: "violence", text: "Experienced Violence Recently", options: ["No", "Yes"], points: { "No": 0, "Yes": 1 } },
];

export function RiskAssessment() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const score = Object.entries(answers).reduce((total, [questionId, answer]) => {
    const question = questions.find(q => q.id === questionId);
    return total + (question?.points[answer as keyof typeof question.points] || 0);
  }, 0);

  const getRiskLevel = (s: number) => {
    if (s <= 1) return { level: "Low Risk", color: "bg-green-500", badge: "default" };
    if (s <= 3) return { level: "Medium Risk", color: "bg-yellow-500", badge: "secondary" };
    return { level: "High Risk", color: "bg-red-500", badge: "destructive" };
  };

  const riskInfo = getRiskLevel(score);

  return (
    <Card id="risk">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><ShieldCheck /> Risk Assessment Wizard</CardTitle>
        <CardDescription>Complete the 6-point scoring algorithm to determine visit frequency.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((q) => (
          <div key={q.id}>
            <Label className="font-semibold">{q.text}</Label>
            <RadioGroup
              value={answers[q.id]}
              onValueChange={(value) => setAnswers(prev => ({...prev, [q.id]: value}))}
              className="mt-2 grid grid-cols-2 gap-4"
            >
              {q.options.map((opt) => (
                <div key={opt} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
                  <Label htmlFor={`${q.id}-${opt}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold text-center mb-4">Risk Score</h3>
          <div className="flex items-center justify-center gap-4">
            <TrendingDown className="text-green-500" />
            <div className="w-full">
              <Progress value={(score / 6) * 100} className="h-4" />
              <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                <span>0</span>
                <span>3</span>
                <span>6</span>
              </div>
            </div>
            <TrendingUp className="text-red-500" />
          </div>
          <div className="text-center mt-4">
            <p className="text-muted-foreground">Total Score: <span className="font-bold text-foreground text-xl">{score}</span>/6</p>
            <p className="text-muted-foreground">Risk Level: <Badge variant={riskInfo.badge as any}>{riskInfo.level}</Badge></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
