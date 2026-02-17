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
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar>
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
          <SidebarFooter />
        </Sidebar>
        <div className="flex flex-col sm:pl-14">
          <DashboardHeader 
            title="Master Supervisor" 
            user={{ name: 'Admin User', avatarId: 'master-supervisor-avatar' }}
          />
          <main className="flex-1 p-4 sm:px-6 sm:py-4 mt-4 sm:mt-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
