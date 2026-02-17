import {
  Home,
  Users,
  Wrench,
  BotMessageSquare
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { DashboardHeader } from '@/components/dashboard-header';
import { Logo } from '@/components/logo';

const navItems = [
  { href: '/master-supervisor', label: 'Dashboard', icon: Home },
  { href: '/master-supervisor', label: 'Tool Designer', icon: Wrench, query: { tab: 'tools' } },
  { href: '/master-supervisor', label: 'User Management', icon: Users, query: { tab: 'users' } },
  { href: '/master-supervisor', label: 'AI Question Designer', icon: BotMessageSquare, query: { tab: 'ai-designer' } },
];

export default function MasterSupervisorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
        <Sidebar collapsible="icon" variant="floating">
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Link href={{ pathname: item.href, query: item.query }} passHref>
                    <SidebarMenuButton tooltip={item.label}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <span className="text-xs font-semibold text-sidebar-foreground/70 text-center px-2 pb-1 group-data-[collapsible=icon]:hidden">Master Supervisor</span>
          <SidebarFooter />
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <DashboardHeader 
            title="Master Supervisor" 
            user={{ name: 'Admin User', avatarId: 'master-supervisor-avatar' }}
          />
          <main className="flex-1 px-4 pb-4 sm:px-6 mt-16">
            {children}
          </main>
        </div>
    </SidebarProvider>
  );
}
