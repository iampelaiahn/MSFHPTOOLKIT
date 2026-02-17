'use client';

import { ArrowLeft, Filter, Search, Shield, BarChart, Database, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const kpiData = [
  { title: 'ASSESSMENTS', value: 0, icon: Shield, color: 'text-primary', borderColor: 'border-primary' },
  { title: 'HIGH RISK NODES', value: 0, color: 'text-red-500', borderColor: 'border-red-500' },
  { title: 'MEDIUM RISK NODES', value: 0, color: 'text-blue-500', borderColor: 'border-blue-500' },
  { title: 'LOW RISK NODES', value: 0, color: 'text-cyan-400', borderColor: 'border-cyan-400' },
];

const riskFactors = [
  { name: 'INCONSISTENT CONDOM USE', value: 0 },
  { name: 'HIGH NUMBER OF SEXUAL PA...', value: 0 },
  { name: 'REPORTED ALCOHOL/SUBST...', value: 0 },
  { name: 'EXPERIENCE OF GENDER-BA...', value: 0 },
  { name: 'LACK OF ACCESS TO HEALTH...', value: 0 },
  { name: 'FREQUENT TRAVEL AWAY FR...', value: 0 },
];

const riskLedgerData: any[] = [
  // empty for now
];

export function RiskIntelligenceDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/community-mobiliser/assessment-repo">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-wider">RISK INTELLIGENCE ANALYSIS</h1>
            <p className="text-muted-foreground">Real-time surveillance monitoring from field data</p>
          </div>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="ward-3">Ward 3</SelectItem>
            <SelectItem value="ward-4">Ward 4</SelectItem>
            <SelectItem value="ward-11">Ward 11</SelectItem>
            <SelectItem value="ward-12">Ward 12</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className={`border-l-4 ${kpi.borderColor || 'border-transparent'}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium uppercase text-muted-foreground">{kpi.title}</CardTitle>
              {kpi.icon && <kpi.icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold ${kpi.color}`}>{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button className="flex-1" size="lg"><Database className="mr-2"/> Data Repository</Button>
        <Button variant="outline" className="flex-1" size="lg"><Cpu className="mr-2"/> Risk Assessment Engine</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><BarChart/> RISK FACTORS PREVALENCE</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskFactors.map(factor => (
              <div key={factor.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-muted-foreground">{factor.name}</span>
                  <span className="text-xs font-bold text-primary">{factor.value}%</span>
                </div>
                <Progress value={factor.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-lg">Client Risk Ledger</CardTitle>
                    <CardDescription>Records for All ({riskLedgerData.length} entries)</CardDescription>
                </div>
                 <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search records..." className="pl-10" />
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>UNIQUE ID</TableHead>
                  <TableHead>WARD</TableHead>
                  <TableHead>BASELINE LEVEL</TableHead>
                  <TableHead>TIMESTAMP</TableHead>
                  <TableHead>PRIORITY</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskLedgerData.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                            No records found.
                        </TableCell>
                    </TableRow>
                ) : (
                    riskLedgerData.map((record) => (
                        <TableRow key={(record as any).id}>
                            <TableCell>{(record as any).id}</TableCell>
                            <TableCell>{(record as any).ward}</TableCell>
                            <TableCell>
                                <Badge variant={(record as any).level === 'High' ? 'destructive' : 'secondary'}>{(record as any).level}</Badge>
                            </TableCell>
                            <TableCell>{(record as any).timestamp}</TableCell>
                             <TableCell>{(record as any).priority}</TableCell>
                        </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
