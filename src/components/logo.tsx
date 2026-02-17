import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-headline font-bold text-primary", className)}>
      <Activity className="h-6 w-6" />
      <span className="tracking-tighter">OutreachRx</span>
    </div>
  );
}
