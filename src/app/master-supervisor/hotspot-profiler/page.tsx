import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function HotspotProfilerPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin /> Hotspot Profiler
          </CardTitle>
          <CardDescription>
            Capture site-specific PSE and structural barriers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Hotspot profiler map and analysis tools coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
