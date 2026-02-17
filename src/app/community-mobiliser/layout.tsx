import {
  Home,
  User,
  ClipboardList,
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
  SidebarFooter,
} from '@/components/ui/sidebar';
import { DashboardHeader } from '@/components/dashboard-header';
import { Logo } from '@/components/logo';

const navItems = [
  { href: '/community-mobiliser', label: 'Dashboard', icon: Home },
  { href: '/community-mobiliser/assessment-repo', label: 'Assessment Repo', icon: ClipboardList },
];

export default function CommunityMobiliserLayout({
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
                  <Link href={item.href} passHref>
                    <SidebarMenuButton tooltip={item.label}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center justify-center gap-2 group-data-[collapsible=icon]:hidden">
              <User className="h-4 w-4 text-sidebar-foreground/70" />
              <span className="text-xs font-semibold text-sidebar-foreground/70">
                Community Health Mobiliser
              </span>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <DashboardHeader 
            title="Community Health Mobiliser" 
            user={{ name: 'Amina Yusuf', avatarId: 'community-mobiliser-avatar' }}
          />
          <main className="flex-1 px-4 pb-4 sm:px-6 mt-16">
            {children}
          </main>
        </div>
    </SidebarProvider>
  );
}
