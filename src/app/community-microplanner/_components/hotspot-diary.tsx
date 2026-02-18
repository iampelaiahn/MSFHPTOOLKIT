'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, BookUser, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const kpiData = [
    { title: "TOTAL CASELOAD", value: "2" },
    { title: "CLINIC LINKAGE", value: "50%", subValue: "CRITICAL: Coverage < 80%", isCritical: true },
    { title: "FSW LOAD", value: "1/80" },
    { title: "MSM LOAD", value: "1/40" },
    { title: "TG LOAD", value: "0/30" },
];

const initialPeers = [
    { uin: 'V-A-80063', type: 'FSW', registration: 'Linked', lastContact: '2024-07-20', status: 'Verified' },
    { uin: 'M-B-91022', type: 'MSM', registration: 'Unlinked', lastContact: '2024-07-21', status: 'Pending' },
];

type Peer = {
    uin: string;
    type: string;
    registration: string;
    lastContact: string;
    status: string;
}

export function HotspotDiary() {
    const [peers, setPeers] = useState<Peer[]>(initialPeers);
    const [newPeerData, setNewPeerData] = useState({ uin: '', type: '', lastContact: '' });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPeerData({ ...newPeerData, [e.target.id]: e.target.value });
    };

    const handleSelectChange = (value: string) => {
        setNewPeerData({ ...newPeerData, type: value });
    };

    const handleAddPeer = () => {
        if (!newPeerData.uin || !newPeerData.type || !newPeerData.lastContact) {
            // Simple validation, you might want to add toasts for user feedback
            return;
        }
        const newPeer: Peer = {
            ...newPeerData,
            registration: 'Unlinked',
            status: 'Pending',
        };
        setPeers([newPeer, ...peers]);
        setIsDialogOpen(false);
        setNewPeerData({ uin: '', type: '', lastContact: '' }); // Reset form
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-headline tracking-wider text-foreground">HOTSPOT DIARY</h1>
                    <p className="text-muted-foreground">Confidential peer ledger & microplanning caseload management.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Peer Listing
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Peer Listing</DialogTitle>
                            <DialogDescription>
                                Enter the details for the new peer to add them to the ledger.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="uin">UIN (Unique Identification Number)</Label>
                                <Input id="uin" value={newPeerData.uin} onChange={handleInputChange} placeholder="e.g., V-A-12345" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <Select onValueChange={handleSelectChange} value={newPeerData.type}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select peer type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="FSW">FSW</SelectItem>
                                        <SelectItem value="MSM">MSM</SelectItem>
                                        <SelectItem value="TG">TG</SelectItem>
                                        <SelectItem value="Drug User">Drug User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="lastContact">Last Contact Date</Label>
                                <Input id="lastContact" type="date" value={newPeerData.lastContact} onChange={handleInputChange} />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleAddPeer}>Save Peer</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
