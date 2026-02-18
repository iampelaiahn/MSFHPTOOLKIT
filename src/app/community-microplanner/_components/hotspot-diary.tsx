'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, BookUser, PlusCircle } from "lucide-react";

const kpiData = [
    { title: "TOTAL CASELOAD", value: "2" },
    { title: "CLINIC LINKAGE", value: "50%", subValue: "CRITICAL: Coverage < 80%", isCritical: true },
    { title: "FSW LOAD", value: "1/80" },
    { title: "MSM LOAD", value: "1/40" },
    { title: "TG LOAD", value: "0/30" },
];

const peers = [
    { uin: 'V-A-80063', type: 'FSW', registration: 'Linked', lastContact: '2024-07-20', status: 'Verified' },
    { uin: 'M-B-91022', type: 'MSM', registration: 'Unlinked', lastContact: '2024-07-21', status: 'Pending' },
];

export function HotspotDiary() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-headline tracking-wider text-foreground">HOTSPOT DIARY</h1>
                    <p className="text-muted-foreground">Confidential peer ledger & microplanning caseload management.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Peer Listing
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {kpiData.map(kpi => (
                    <Card key={kpi.title} className="bg-card/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`text-4xl font-bold ${kpi.isCritical ? 'text-destructive' : 'text-foreground'}`}>{kpi.value}</div>
                            {kpi.subValue && <p className={`text-xs ${kpi.isCritical ? 'text-destructive' : 'text-muted-foreground'}`}>{kpi.subValue}</p>}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookUser />
                        Active Peers Ledger
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>UIN</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Registration</TableHead>
                                <TableHead>Last Contact</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {peers.map(peer => (
                                <TableRow key={peer.uin}>
                                    <TableCell className="font-mono font-medium">{peer.uin}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-blue-900/50 text-blue-300 border-blue-500/50">{peer.type}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className={`flex items-center gap-2 font-medium ${peer.registration === 'Linked' ? 'text-cyan-400' : 'text-destructive'}`}>
                                            {peer.registration === 'Linked' ? <CircleCheck className="h-4 w-4" /> : <CircleX className="h-4 w-4" />}
                                            {peer.registration}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{peer.lastContact}</TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant="outline" 
                                            className={`font-medium
                                                ${peer.status === 'Verified' ? 'text-cyan-400 border-cyan-400/50 bg-cyan-900/40' : ''}
                                                ${peer.status === 'Pending' ? 'text-amber-400 border-amber-400/50 bg-amber-900/40' : ''}
                                            `}
                                        >
                                            {peer.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}