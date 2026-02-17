import { ReferralReconciliation } from "./_components/referral-reconciliation";
import { AppointmentTracker } from "./_components/appointment-tracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookHeart, ClipboardList } from "lucide-react";


export default function FacilityMicroplannerPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <ReferralReconciliation />
        <Card id="log">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ClipboardList /> Clinical Service Log</CardTitle>
            <CardDescription>Record services delivered at the facility.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Module for Clinical Service Log coming soon.</p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <AppointmentTracker />
        <Card id="education">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookHeart /> Health Education</CardTitle>
            <CardDescription>Interactive modules for conducting sessions at the facility.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Facility-based Health Education modules coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
