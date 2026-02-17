"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { TrendingUp, Users, Link as LinkIcon, Target } from "lucide-react"

const kpiData = [
  { title: "Total Referrals", value: "1,284", change: "+20.1% from last month", icon: Users },
  { title: "Linkage to Care Rate", value: "72.3%", change: "+2.5% from last month", icon: LinkIcon },
  { title: "Hotspot Coverage", value: "88%", change: "-1.2% from last month", icon: Target },
  { title: "Positive Yield", value: "5.8%", change: "+0.5% from last month", icon: TrendingUp },
];

const chartData = [
  { month: "Jan", community: 400, facility: 240 },
  { month: "Feb", community: 300, facility: 139 },
  { month: "Mar", community: 200, facility: 980 },
  { month: "Apr", community: 278, facility: 390 },
  { month: "May", community: 189, facility: 480 },
  { month: "Jun", community: 239, facility: 380 },
  { month: "Jul", community: 349, facility: 430 },
]

export function SynthesisDashboard() {
  return (
    <div className="space-y-6">
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
            <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className={`text-xs ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{kpi.change}</p>
            </CardContent>
            </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Community Referrals vs. Facility Linkage</CardTitle>
          <CardDescription>
            A comparison of peers referred from the community vs. those successfully linked to care at a facility.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                }}
              />
              <Legend />
              <Bar
                dataKey="community"
                fill="hsl(var(--primary))"
                name="Community Referrals"
                activeBar={<Rectangle fill="hsl(var(--accent))" stroke="hsl(var(--primary))" />}
              />
              <Bar
                dataKey="facility"
                fill="hsl(var(--secondary-foreground))"
                name="Facility Linkages"
                activeBar={<Rectangle fill="hsl(var(--accent))" stroke="hsl(var(--secondary-foreground))" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
