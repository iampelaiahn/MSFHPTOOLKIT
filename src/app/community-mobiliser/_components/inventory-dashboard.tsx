'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownToLine, ArrowUpFromLine, Package, History, PlusCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

const microplanners = [
    { id: 'user-1', name: 'John Doe' },
    { id: 'user-2', name: 'Peter Jones' },
];

const initialInventoryData = {
    'matapi-hub': {
        name: 'Matapi Youth Hub (Wards 3 & 4)',
        received: 29700,
        dispensed: 14350,
        items: [
            { id: 'condoms', name: 'Condoms', inHand: 8000, capacity: 12000 },
            { id: 'hivst', name: 'HIVST Kits', inHand: 1200, capacity: 2000 },
            { id: 'lube', name: 'Lube', inHand: 2200, capacity: 4000 },
            { id: 'preg-test', name: 'Pregnancy Test Kits', inHand: 500, capacity: 1000 },
            { id: 'urine-jars', name: 'Urine Jars', inHand: 1500, capacity: 3000 },
        ]
    },
    'edith-opperman': {
        name: 'Edith Opperman (Wards 11 & 12)',
        received: 15000,
        dispensed: 7500,
        items: [
            { id: 'condoms', name: 'Condoms', inHand: 4000, capacity: 6000 },
            { id: 'hivst', name: 'HIVST Kits', inHand: 800, capacity: 1500 },
            { id: 'lube', name: 'Lube', inHand: 1000, capacity: 2000 },
            { id: 'preg-test', name: 'Pregnancy Test Kits', inHand: 300, capacity: 500 },
            { id: 'urine-jars', name: 'Urine Jars', inHand: 900, capacity: 1500 },
        ]
    }
};

type Item = {
    id: string;
    name: string;
    inHand: number;
    capacity: number;
};

type HubData = {
    name: string;
    received: number;
    dispensed: number;
    items: Item[];
};

export function InventoryDashboard() {
    const [inventory, setInventory] = useState(initialInventoryData);
    const [activeTab, setActiveTab] = useState(Object.keys(initialInventoryData)[0]);
    const { toast } = useToast();

    const activeHubData = inventory[activeTab as keyof typeof inventory] as HubData;

    const handleDispense = (hubId: string, itemId: string, amount: number, microplanner: string) => {
        if (!amount || amount <= 0 || !microplanner) {
            toast({
                variant: "destructive",
                title: "Invalid Input",
                description: "Please enter a valid amount and select a microplanner.",
            });
            return;
        }

        setInventory(prev => {
            const newInventory = JSON.parse(JSON.stringify(prev)); // Deep copy
            const hub = newInventory[hubId as keyof typeof newInventory] as HubData;
            const itemIndex = hub.items.findIndex(i => i.id === itemId);

            if (itemIndex === -1) return prev;

            const item = hub.items[itemIndex];
            
            if (item.inHand < amount) {
                toast({
                    variant: "destructive",
                    title: "Insufficient Stock",
                    description: `Cannot dispense ${amount} units. Only ${item.inHand} available.`,
                });
                return prev;
            }
            
            item.inHand -= amount;
            hub.dispensed += amount;

            newInventory[hubId as keyof typeof newInventory] = hub;

            toast({
                title: "Dispensed Successfully",
                description: `${amount} units of ${item.name} dispensed to ${microplanner}.`,
            });
            
            return newInventory;
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Inventory Logistics</h1>
                    <p className="text-muted-foreground">Warehouse → Facility Nodes → Peer Distribution</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><History className="mr-2"/> Audit Logs</Button>
                    <Button><PlusCircle className="mr-2"/> Stock Entry</Button>
                </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
                    {Object.entries(inventory).map(([hubId, hubData]) => (
                         <TabsTrigger key={hubId} value={hubId}>{hubData.name}</TabsTrigger>
                    ))}
                </TabsList>
                {Object.entries(inventory).map(([hubId, hubData]) => (
                    <TabsContent key={hubId} value={hubId} className="space-y-6 mt-6">
                        <div className="grid gap-4 md:grid-cols-3">
                            <KpiCard 
                                title="Total Received (from Warehouse)" 
                                value={hubData.received.toLocaleString()}
                                description="NODE CAPACITY"
                                icon={ArrowDownToLine}
                                className="bg-chart-1/10 border-chart-1"
                                iconClassName="text-chart-1"
                                valueClassName="text-chart-1"
                            />
                            <KpiCard 
                                title="Total Dispensed (to Peers)" 
                                value={hubData.dispensed.toLocaleString()}
                                description="COMMUNITY OUTREACH"
                                icon={ArrowUpFromLine}
                                className="bg-destructive/10 border-destructive"
                                iconClassName="text-destructive"
                                valueClassName="text-destructive"
                            />
                            <KpiCard 
                                title="Current In Hand" 
                                value={(hubData.received - hubData.dispensed).toLocaleString()}
                                description="FACILITY BALANCE"
                                icon={Package}
                                className="bg-chart-2/10 border-chart-2"
                                iconClassName="text-chart-2"
                                valueClassName="text-chart-2"
                            />
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Stock Items in Hand</h3>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {hubData.items.map(item => (
                                    <CommodityCard key={item.id} item={item} hubId={hubId} hubName={hubData.name} onDispense={handleDispense} />
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

function KpiCard({ title, value, description, icon: Icon, className, valueClassName, iconClassName }: { title: string, value: string, description: string, icon: React.ElementType, className?: string, valueClassName?:string, iconClassName?: string }) {
    return (
        <Card className={cn("p-4 border-l-4", className)}>
            <div className="flex items-start gap-4">
                 <Icon className={cn("h-6 w-6 mt-1", iconClassName)} />
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className={cn("text-3xl font-bold", valueClassName)}>{value}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
            </div>
        </Card>
    );
}

function CommodityCard({ item, hubId, hubName, onDispense }: { item: Item, hubId: string, hubName: string, onDispense: (hubId: string, itemId: string, amount: number, microplanner: string) => void }) {
    const utilization = item.capacity > 0 ? ((item.capacity - item.inHand) / item.capacity) * 100 : 0;
    const [dispenseAmount, setDispenseAmount] = useState('');
    const [selectedPlanner, setSelectedPlanner] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSubmit = () => {
        onDispense(hubId, item.id, parseInt(dispenseAmount), selectedPlanner);
        setIsDialogOpen(false);
        setDispenseAmount('');
        setSelectedPlanner('');
    };

    return (
        <Card className="border-l-4 border-chart-1">
            <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{hubName.split('(')[0].trim()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <span className="text-4xl font-bold">{item.inHand.toLocaleString()}</span>
                    <span className="ml-2 text-muted-foreground">UNITS IN HAND</span>
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <Label htmlFor={`progress-${item.id}`} className="text-xs">UTILIZATION</Label>
                        <span className="text-xs font-semibold">{Math.round(utilization)}%</span>
                    </div>
                    <Progress id={`progress-${item.id}`} value={utilization} className="h-2 [&>div]:bg-chart-1" />
                </div>
            </CardContent>
            <CardFooter>
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full bg-chart-1 hover:bg-chart-1/80 text-white">Dispense</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Dispense {item.name}</DialogTitle>
                            <DialogDescription>
                                Dispense stock to a microplanner. Current stock: {item.inHand.toLocaleString()} units.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                             <div>
                                <Label htmlFor="microplanner-select">Microplanner</Label>
                                <Select onValueChange={setSelectedPlanner} value={selectedPlanner}>
                                    <SelectTrigger id="microplanner-select">
                                        <SelectValue placeholder="Select a microplanner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {microplanners.map(planner => (
                                            <SelectItem key={planner.id} value={planner.name}>{planner.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="dispense-amount">Amount</Label>
                                <Input 
                                    id="dispense-amount" 
                                    type="number"
                                    placeholder="e.g., 50"
                                    value={dispenseAmount}
                                    onChange={e => setDispenseAmount(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSubmit}>Confirm Dispense</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
}