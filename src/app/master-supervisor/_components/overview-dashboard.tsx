import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

const analysisCards = [
  {
    title: "Risk Assessment Intelligence",
    description: "AI-powered vulnerability screening and clinical rationale.",
    iconColor: "bg-primary",
    stats: [
      { label: "82% VERIFICATION" },
      { label: "14% HIGH RISK" },
    ],
    href: "/community-mobiliser/assessment-repo",
  },
  {
    title: "Hotspot Profiler",
    description: "Capture site-specific PSE and structural barriers.",
    iconColor: "bg-chart-2",
    stats: [
      { label: "12 SITES MAPPED" },
      { label: "92% COVERAGE" },
    ],
    href: "/master-supervisor/hotspot-profiler",
  },
  {
    title: "Social Network Analysis",
    description: "Visualize peer-to-peer trust networks and nano-networks.",
    iconColor: "bg-primary",
    stats: [
      { label: "142 TRUST NODES" },
      { label: "18 BRIDGES" },
    ],
    href: "/community-mobiliser/assessment-repo/social-network-analysis",
  },
];

export function OverviewDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {analysisCards.map((card) => (
        <Card key={card.title} className="flex flex-col border-primary/20 bg-card hover:border-primary/50 transition-colors duration-300">
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-md ${card.iconColor}`} />
              <Badge variant="outline" className="border-primary text-primary">ACTIVE</Badge>
            </div>
            <CardTitle className="text-xl">{card.title}</CardTitle>
            <CardDescription className="h-12">{card.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2">
              {card.stats.map(stat => (
                <Badge key={stat.label} variant="secondary">
                  {stat.label}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" asChild className="p-0 h-auto text-primary font-semibold">
              <Link href={card.href}>
                OPEN ANALYSIS
                <TrendingUp className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
