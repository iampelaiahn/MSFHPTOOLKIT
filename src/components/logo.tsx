import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="https://i.imgur.com/ZZopidV.png"
        alt="OutreachRx Logo"
        width={163}
        height={44}
        priority
      />
    </div>
  );
}
