import { cn } from "@/lib/utils";
import Image from "next/image";
import { Stethoscope } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center h-[44px]", className)}>
      <Image
        className="group-data-[state=collapsed]:hidden"
        src="https://i.imgur.com/ZZopidV.png"
        alt="OutreachRx Logo"
        width={163}
        height={44}
        priority
      />
      <Stethoscope className="h-7 w-7 text-primary hidden group-data-[state=collapsed]:block" />
    </div>
  );
}
