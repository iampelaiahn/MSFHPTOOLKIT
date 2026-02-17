import {
  Home,
  LineChart,
  Map,
  FileText,
  Package,
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
  { href: '/community-mobiliser', label: 'Inventory', icon: Package, query: { tab: 'inventory' } },
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
            <SidebarMenu className="mt-[10%]">
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
          <SidebarFooter>
            <span className="text-xs font-semibold text-sidebar-foreground/70 text-center group-data-[collapsible=icon]:hidden">Community Health Mobiliser</span>
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
