import { TaskList } from "./_components/task-list";
import { ReferralGenerator } from "./_components/referral-generator";
import { RiskAssessment } from "./_components/risk-assessment";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookHeart, Users } from "lucide-react";

export default function CommunityMicroplannerPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <TaskList />
        <ReferralGenerator />
      </div>
      <div className="space-y-6">
        <RiskAssessment />
        <Card id="hivst">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users /> HIVST Register</CardTitle>
                <CardDescription>Log self-test kit distribution and results.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Module for HIVST Register coming soon.</p>
            </CardContent>
        </Card>
        <Card id="education">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookHeart /> Health Education</CardTitle>
                <CardDescription>Interactive modules for conducting sessions in the community.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Interactive Health Education modules coming soon.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
