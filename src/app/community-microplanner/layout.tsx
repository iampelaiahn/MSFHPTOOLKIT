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
  { href: '#risk', label: 'Risk Assessment', icon: ShieldCheck },
  { href: '#hivst', label: 'HIVST Register', icon: Users },
  { href: '#refer', label: 'Refer a Peer', icon: QrCode },
  { href: '#education', label: 'Health Education', icon: BookHeart },
];

export default function CommunityMicroplannerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Sidebar>
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
          <SidebarFooter />
        </Sidebar>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <DashboardHeader 
            title="Community Microplanner"
            user={{ name: 'John Doe', avatarId: 'community-microplanner-avatar' }}
          />
          <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
