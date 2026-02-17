'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SynthesisDashboard } from "./_components/synthesis-dashboard";
import { GeospatialView } from "./_components/geospatial-view";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleMapsProvider } from "./_components/google-maps-provider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TrendingUp, Users, Link as LinkIcon, Target } from "lucide-react";
import { InventoryDashboard } from "./_components/inventory-dashboard";

const kpiData = [
  { title: "Total Referrals", value: "1,284", change: "+20.1% from last month", icon: Users },
  { title: "Linkage to Care Rate", value: "72.3%", change: "+2.5% from last month", icon: LinkIcon },
  { title: "Hotspot Coverage", value: "88%", change: "-1.2% from last month", icon: Target },
  { title: "Positive Yield", value: "5.8%", change: "+0.5% from last month", icon: TrendingUp },
];

export default function CommunityMobiliserPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'synthesis';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full pt-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="synthesis">Synthesis Dashboard</TabsTrigger>
        <TabsTrigger value="geospatial">Geospatial View</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
      </TabsList>
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
                  <p className={`text-xs ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{kpi.change}</p>
              </CardContent>
              </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
            <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and view automated performance reports.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Report generation and viewing functionality will be available here.</p>
            </CardContent>
        </Card>
      </TabsContent>
       <TabsContent value="inventory" className="mt-0">
        <InventoryDashboard />
      </TabsContent>
    </Tabs>
  );
}
