import {
  Home,
  QrCode,
  ClipboardList,
  CalendarClock,
  BookHeart,
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
];

export default function FacilityMicroplannerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-body antialiased">
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
                title="Facility Microplanner"
                user={{ name: 'Jane Smith', avatarId: 'facility-microplanner-avatar' }}
              />
              <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
