import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export function HivstRegister() {
    return (
        <Card id="hivst">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users /> HIVST Register</CardTitle>
                <CardDescription>Log self-test kit distribution and results.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Module for HIVST Register coming soon.</p>
            </CardContent>
        </Card>
    );
}
