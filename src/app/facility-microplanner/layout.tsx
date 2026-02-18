import {
  Home,
  QrCode,
  ClipboardList,
  CalendarClock,
  BookHeart,
  Network,
  User,
  RefreshCw,
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
  { href: '/facility-microplanner', label: 'My Tasks', icon: Home },
  { href: '#reconciliation', label: 'Referral Check-in', icon: QrCode },
  { href: '#log', label: 'Clinical Service Log', icon: ClipboardList },
  { href: '#appointments', label: 'Appointment Tracker', icon: CalendarClock },
  { href: '#education', label: 'Health Education', icon: BookHeart },
  { href: '/facility-microplanner/social-map', label: 'Social Map', icon: Network },
  { href: '/facility-microplanner/data-sync', label: 'Data Sync', icon: RefreshCw },
];

export default function FacilityMicroplannerLayout({
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
                    Facility Microplanner
                </span>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <DashboardHeader 
            title="Facility Microplanner"
            user={{ name: 'Jane Smith', avatarId: 'facility-microplanner-avatar' }}
          />
          <main className="flex-1 px-4 pb-4 sm:px-6 mt-16">
            {children}
          </main>
        </div>
    </SidebarProvider>
  );
}
