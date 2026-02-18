import {
  Home,
  MapPin,
  Users,
  ShieldCheck,
  BookHeart,
  QrCode,
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
  { href: '/community-microplanner', label: 'My Tasks', icon: Home },
  { href: '#hotspots', label: 'Hotspot Diary', icon: MapPin },
  { href: '/community-microplanner/risk-assessment', label: 'Risk Assessment', icon: ShieldCheck },
  { href: '/community-microplanner/hivst-register', label: 'HIVST Register', icon: Users },
  { href: '/community-microplanner/refer-a-peer', label: 'Refer a Peer', icon: QrCode },
  { href: '/community-microplanner/health-education', label: 'Health Education', icon: BookHeart },
];

export default function CommunityMicroplannerLayout({
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
          <span className="text-xs font-semibold text-sidebar-foreground/70 text-center px-2 pb-1 group-data-[collapsible=icon]:hidden">Community Microplanner</span>
          <SidebarFooter />
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <DashboardHeader 
            title="Community Microplanner"
            user={{ name: 'John Doe', avatarId: 'community-microplanner-avatar' }}
          />
          <main className="flex-1 px-4 pb-4 sm:px-6 mt-16">
            {children}
          </main>
        </div>
    </SidebarProvider>
  );
}
