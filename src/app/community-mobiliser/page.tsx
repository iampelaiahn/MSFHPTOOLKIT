'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SynthesisDashboard } from "./_components/synthesis-dashboard";
import { GeospatialView } from "./_components/geospatial-view";
import { GoogleMapsProvider } from "./_components/google-maps-provider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TrendingUp, Users, Link as LinkIcon, Target } from "lucide-react";
import { InventoryDashboard } from "./_components/inventory-dashboard";
import { AIReportGenerator } from "./_components/ai-report-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOnly } from "@/components/client-only";
import { Skeleton } from "@/components/ui/skeleton";

const kpiData = [
  { title: "Total Referrals", value: "1,284", change: "+20.1% from last month", icon: Users },
  { title: "Linkage to Care Rate", value: "72.3%", change: "+2.5% from last month", icon: LinkIcon },
  { title: "Hotspot Coverage", value: "88%", change: "-1.2% from last month", icon: Target },
  { title: "Positive Yield", value: "5.8%", change: "+0.5% from last month", icon: TrendingUp },
];

export default function CommunityMobiliserPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'inventory';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const TabsSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-[600px] w-full" />
    </div>
  );

  return (
    <ClientOnly fallback={<TabsSkeleton />}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-16 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-2">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="synthesis">Synthesis Dashboard</TabsTrigger>
            <TabsTrigger value="geospatial">Geospatial View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="synthesis">
          <SynthesisDashboard />
        </TabsContent>
        <TabsContent value="geospatial">
          <GoogleMapsProvider>
              <GeospatialView />
          </GoogleMapsProvider>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi) => (
                <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p className={`text-xs ${kpi.change.startsWith('+') ? 'text-foreground' : 'text-destructive'}`}>{kpi.change}</p>
                </CardContent>
                </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <AIReportGenerator />
        </TabsContent>
        <TabsContent value="inventory" className="mt-0">
          <InventoryDashboard />
        </TabsContent>
      </Tabs>
    </ClientOnly>
  );
}
