import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, UserCog, Presentation, Hospital } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/logo";

type Role = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const roles: Role[] = [
  {
    name: "Master Supervisor",
    description: "System configuration, tool design, and high-level oversight.",
    href: "/master-supervisor",
    icon: UserCog,
  },
  {
    name: "Community Health Mobiliser",
    description: "Data synthesis and operational decision-making.",
    href: "/community-mobiliser",
    icon: Presentation,
  },
  {
    name: "Community-Based Microplanner",
    description: "Field outreach, peer registration, and risk assessment.",
    href: "/community-microplanner",
    icon: Users,
  },
  {
    name: "Facility-Based Microplanner",
    description: "Clinical linkage, referral reconciliation, and appointments.",
    href: "/facility-microplanner",
    icon: Hospital,
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="mb-12 text-center">
          <Logo className="justify-center text-5xl mb-4" />
          <h1 className="text-4xl font-headline font-bold tracking-tight text-foreground sm:text-5xl">
            Health promotion toolkit
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Microplanning for Community Health Outreach
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl">
          {roles.map((role) => (
            <Card
              key={role.name}
              className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                  <role.icon className="h-10 w-10" />
                </div>
                <CardTitle className="font-headline text-2xl">{role.name}</CardTitle>
                <CardDescription className="mt-2 text-base text-center h-16">{role.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex justify-center">
                <Button asChild className="w-full">
                  <Link href={role.href}>
                    Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <footer className="py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} OutreachRx. All rights reserved.</p>
      </footer>
    </div>
  );
}
