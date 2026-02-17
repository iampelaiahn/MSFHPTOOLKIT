import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

export default function AssessmentRepoPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList /> Assessment Repo
          </CardTitle>
          <CardDescription>
            A central repository for viewing and managing risk assessments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Assessment repository functionality coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
