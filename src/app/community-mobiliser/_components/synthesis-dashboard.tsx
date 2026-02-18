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
import { useCollection, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useMemo } from "react";
import { Referral } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export function SynthesisDashboard() {
  const firestore = useFirestore();
  const referralsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "referrals"), orderBy("referralDate", "asc"));
  }, [firestore]);
  const { data: referrals, loading } = useCollection<Referral>(referralsQuery);

  const chartData = useMemo(() => {
    if (!referrals) return [];
    
    const monthlyData: { [key: string]: { month: string; community: number; facility: number; unlinked: number } } = {};
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    monthOrder.forEach(m => {
        monthlyData[m] = { month: m, community: 0, facility: 0, unlinked: 0 };
    });

    referrals.forEach(ref => {
        const month = ref.month;
        if (monthlyData[month]) {
            monthlyData[month].community += 1;
            if (ref.linked) {
                monthlyData[month].facility += 1;
            }
        }
    });

    // Calculate unlinked and filter out months with no data
    const filteredData = Object.values(monthlyData).map(data => ({
        ...data,
        unlinked: data.community - data.facility
    })).filter(d => d.community > 0);
    
    return filteredData;

  }, [referrals]);
  
  if (loading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[350px] w-full" />
            </CardContent>
        </Card>
    );
  }

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
                dataKey="facility"
                stackId="a"
                fill="hsl(var(--primary))"
                name="Facility Linkages"
                activeBar={<Rectangle fill="hsl(var(--accent))" stroke="hsl(var(--primary))" />}
              />
               <Bar
                dataKey="unlinked"
                stackId="a"
                fill="hsl(var(--muted))"
                name="Unlinked"
                activeBar={<Rectangle fill="hsl(var(--accent))" stroke="hsl(var(--muted))" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
  )
}
