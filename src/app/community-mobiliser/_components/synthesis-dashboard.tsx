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
  )
}
