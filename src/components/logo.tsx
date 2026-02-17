import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center h-[44px] mt-2", className)}>
      <Image
        className="group-data-[state=collapsed]:hidden"
        src="https://i.imgur.com/ZZopidV.png"
        alt="OutreachRx Logo"
        width={114}
        height={31}
        priority
      />
      <Image
        className="hidden group-data-[state=collapsed]:block"
        src="https://i.imgur.com/ccXkOzW.png"
        alt="OutreachRx Icon"
        width={28}
        height={28}
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  );
}
