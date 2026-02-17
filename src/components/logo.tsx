import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="https://i.imgur.com/i1v7Dmh.png"
        alt="OutreachRx Logo"
        width={108}
        height={24}
        priority
        className="dark:invert"
      />
    </div>
  );
}
