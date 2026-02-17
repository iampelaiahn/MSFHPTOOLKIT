import {
  Home,
  LineChart,
  Map,
  FileText,
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
  { href: '/community-mobiliser', label: 'Dashboard', icon: Home, query: { tab: 'synthesis' } },
  { href: '/community-mobiliser', label: 'Geospatial View', icon: Map, query: { tab: 'geospatial' } },
  { href: '/community-mobiliser', label: 'Analytics', icon: LineChart, query: { tab: 'analytics' } },
  { href: '/community-mobiliser', label: 'Reports', icon: FileText, query: { tab: 'reports' } },
];

export default function CommunityMobiliserLayout({
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
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <DashboardHeader 
            title="Community Health Mobiliser" 
            user={{ name: 'Amina Yusuf', avatarId: 'community-mobiliser-avatar' }}
          />
           <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
