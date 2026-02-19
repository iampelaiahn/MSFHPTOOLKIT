import Link from "next/link";
import Image from "next/image";
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
import { PlaceHolderImages } from "@/lib/placeholder-images";

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

const gridImageIds = [
    "landing-grid-1",
    "landing-grid-2",
    "landing-grid-3",
    "landing-grid-4",
    // placeholder for main content
    null, 
    "landing-grid-5",
    "landing-grid-6",
    "landing-grid-7",
    "landing-grid-8",
];


export default function Home() {
  
  const mainContent = (
    <div className="flex flex-col items-center justify-center bg-black text-white p-4 z-10 w-full max-w-3xl h-full">
      <div className="text-center flex flex-col items-center">
         <Image
            src="https://i.imgur.com/BGdgfmI.png"
            alt="MSFIP Toolkit Logo"
            width={80}
            height={22}
            className="mb-3"
            priority
          />
        <h1 className="text-2xl font-headline font-bold tracking-tight text-white">
          Health promotion toolkit
        </h1>
        <p className="mt-1 text-xs text-neutral-400">
          Microplanning for Community Health Outreach
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full mt-6">
        {roles.map((role) => (
          <Card
            key={role.name}
            className="flex flex-col bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 text-left"
          >
            <CardHeader className="p-0 flex flex-col items-start">
              <div className="mb-2 rounded-full bg-neutral-800 p-1.5 text-primary">
                <role.icon className="h-4 w-4" />
              </div>
              <CardTitle className="font-headline font-bold text-sm">{role.name}</CardTitle>
              <CardDescription className="mt-1 text-xs text-neutral-400">
                {role.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-auto flex pt-3">
              <Button asChild variant="default" size="sm" className="w-full h-8 text-xs">
                <Link href={role.href}>
                  Enter Dashboard <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-1">
        {gridImageIds.map((id, index) => {
            if (id === null) {
                return (
                    <div key="main-content" className="flex items-center justify-center bg-black overflow-hidden p-2">
                        {mainContent}
                    </div>
                );
            }
            const img = PlaceHolderImages.find(i => i.id === id);
            if (!img) return <div key={`empty-${index}`} className="bg-black" />;
            
            return (
                <div key={img.id} className="overflow-hidden relative">
                    <Image
                        src={img.imageUrl}
                        alt={img.description}
                        fill
                        className="object-cover w-full h-full"
                        data-ai-hint={img.imageHint}
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
            );
        })}
      </div>
    </div>
  );
}
