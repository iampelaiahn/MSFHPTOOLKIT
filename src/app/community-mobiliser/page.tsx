'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SynthesisDashboard } from "./_components/synthesis-dashboard";
import { GeospatialView } from "./_components/geospatial-view";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleMapsProvider } from "./_components/google-maps-provider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="synthesis">Synthesis Dashboard</TabsTrigger>
        <TabsTrigger value="geospatial">Geospatial View</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
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
        <Card>
            <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Detailed trends and data analysis.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Advanced analytics tools will be available here.</p>
            </CardContent>
        </Card>
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
    </Tabs>
  );
}
