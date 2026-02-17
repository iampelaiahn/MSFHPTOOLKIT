'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolDesigner } from "./_components/tool-designer";
import { UserManagement } from "./_components/user-management";
import { AIRiskQuestionDesigner } from "./_components/ai-risk-question-designer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MasterSupervisorPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'tools';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tools">Tool Designer</TabsTrigger>
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="ai-designer">AI Question Designer</TabsTrigger>
      </TabsList>
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
  );
}
