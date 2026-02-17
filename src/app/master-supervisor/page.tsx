'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolDesigner } from "./_components/tool-designer";
import { UserManagement } from "./_components/user-management";
import { AIRiskQuestionDesigner } from "./_components/ai-risk-question-designer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OverviewDashboard } from "./_components/overview-dashboard";
import { ClientOnly } from "@/components/client-only";
import { Skeleton } from "@/components/ui/skeleton";

export default function MasterSupervisorPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'dashboard';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab('dashboard');
    }
  }, [searchParams]);

  const TabsSkeleton = (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-[600px] w-full" />
    </div>
  );

  return (
    <ClientOnly fallback={<TabsSkeleton />}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-16 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-2">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="tools">Tool Designer</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="ai-designer">AI Question Designer</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="dashboard">
          <OverviewDashboard />
        </TabsContent>
        <TabsContent value="tools">
          <ToolDesigner />
        </TabsContent>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="ai-designer">
          <AIRiskQuestionDesigner />
        </TabsContent>
      </Tabs>
    </ClientOnly>
  );
}
