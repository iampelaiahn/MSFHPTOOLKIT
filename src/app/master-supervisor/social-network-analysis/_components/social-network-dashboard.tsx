'use client';

import { ArrowLeft, BarChart, Cpu, Database, Filter, Network, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const kpiData = [
  { title: 'NETWORK NODES', value: '4', icon: Network, color: 'text-primary', borderColor: 'border-primary' },
  { title: 'COVERAGE RATE', value: '27%', color: 'text-red-500', borderColor: 'border-red-500' },
  { title: 'NETWORK SCORE', value: '2.0/3.0', progress: (2.0/3.0) * 100, color: 'text-cyan-400', borderColor: 'border-cyan-400' },
];

const nodeDistribution = [
  { name: 'PEER LEADER', value: 50 },
  { name: 'INFLUENCER', value: 25 },
  { name: 'KP MEMBER', value: 25 },
];

const bridgeLedgerData = [
    { id: 1, name: 'Sarah (Leader)', ward: 'Ward 3', typology: 'PEER LEADER', influence: 95, priority: 'STANDARD' },
    { id: 2, name: 'Mercy (Influencer)', ward: 'Ward 3', typology: 'INFLUENCER', influence: 75, priority: 'STANDARD' },
    { id: 3, name: 'John (KP)', ward: 'Ward 11', typology: 'KP MEMBER', influence: 40, priority: 'STANDARD' },
    { id: 4, name: 'Clara (Leader)', ward: 'Ward 4', typology: 'PEER LEADER', influence: 90, priority: 'STANDARD' },
];

export function SocialNetworkDashboard() {
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
            <h1 className="text-2xl font-bold text-primary tracking-wider">SOCIAL NETWORK ANALYSIS</h1>
            <p className="text-muted-foreground">Real-time KPI tracking from peer educator records</p>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className={`border-l-4 ${kpi.borderColor}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium uppercase text-muted-foreground">{kpi.title}</CardTitle>
              {kpi.icon && <kpi.icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold ${kpi.color}`}>{kpi.value}</div>
              {kpi.progress !== undefined && <Progress value={kpi.progress} className="h-2 mt-2" />}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button className="flex-1" size="lg"><Database className="mr-2"/> Data Repository</Button>
        <Button variant="outline" className="flex-1" size="lg"><Cpu className="mr-2"/> Network Integrity Engine</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><BarChart/> NODE DISTRIBUTION</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nodeDistribution.map(factor => (
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
                    <CardTitle className="text-lg">Network Bridge Ledger</CardTitle>
                    <p className="text-sm text-muted-foreground">Records for All ({bridgeLedgerData.length} entries)</p>
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
                  <TableHead>NAME</TableHead>
                  <TableHead>WARD</TableHead>
                  <TableHead>TYPOLOGY</TableHead>
                  <TableHead>INFLUENCE</TableHead>
                  <TableHead>PRIORITY</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bridgeLedgerData.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                            No records found.
                        </TableCell>
                    </TableRow>
                ) : (
                    bridgeLedgerData.map((record) => (
                        <TableRow key={record.id}>
                            <TableCell>{record.name}</TableCell>
                            <TableCell>{record.ward}</TableCell>
                            <TableCell>
                                <Badge variant={record.typology === 'PEER LEADER' ? 'default' : 'secondary'}>{record.typology}</Badge>
                            </TableCell>
                             <TableCell className="text-primary font-bold">{record.influence}</TableCell>
                             <TableCell>
                                 <Badge variant="outline">{record.priority}</Badge>
                             </TableCell>
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