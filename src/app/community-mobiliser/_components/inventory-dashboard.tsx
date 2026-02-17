'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownToLine, ArrowUpFromLine, Package, History, PlusCircle, ArrowLeftRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

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

type StockUpdatePayload = {
    type: 'entry' | 'dispense' | 'return';
    microplanner?: string;
    items: { itemId: string; amount: number }[];
};


export function InventoryDashboard() {
    const [inventory, setInventory] = useState(initialInventoryData);
    const [activeTab, setActiveTab] = useState(Object.keys(initialInventoryData)[0]);
    const { toast } = useToast();
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<'entry' | 'action' | null>(null);

    const activeHubData = inventory[activeTab as keyof typeof inventory] as HubData;

    const handleStockUpdate = (hubId: string, updates: StockUpdatePayload) => {
        const { type, microplanner, items } = updates;

        if (type === 'action' && !microplanner) {
            toast({ variant: "destructive", title: "Missing Information", description: "Please select a microplanner." });
            return;
        }

        if (items.length === 0) {
            toast({ variant: "destructive", title: "Missing Information", description: "Please enter a quantity for at least one item." });
            return;
        }

        setInventory(prev => {
            const newInventory = JSON.parse(JSON.stringify(prev));
            const hub = newInventory[hubId as keyof typeof newInventory] as HubData;
            let success = true;

            for (const { itemId, amount } of items) {
                if (amount <= 0) continue;
                const itemIndex = hub.items.findIndex(i => i.id === itemId);
                if (itemIndex === -1) {
                    success = false;
                    break;
                }
                const item = hub.items[itemIndex];

                if (type === 'dispense') {
                    if (item.inHand < amount) {
                        toast({ variant: "destructive", title: "Insufficient Stock", description: `Cannot dispense ${amount} of ${item.name}. Only ${item.inHand} available.` });
                        success = false;
                        break;
                    }
                    item.inHand -= amount;
                    hub.dispensed += amount;
                } else if (type === 'return') {
                    item.inHand += amount;
                    hub.dispensed -= amount;
                } else if (type === 'entry') {
                    item.inHand += amount;
                    hub.received += amount;
                }
            }
            
            if (success) {
                let title = "";
                let description = "";
                 if (type === 'dispense') {
                    title = "Dispensed Successfully";
                    description = `Items dispensed to ${microplanner}.`;
                } else if (type === 'return') {
                    title = "Return Processed";
                    description = `Items returned from ${microplanner}.`;
                } else if (type === 'entry') {
                    title = "Stock Entry Successful";
                    description = `New stock added to ${hub.name}.`;
                }
                toast({ title, description });
                newInventory[hubId as keyof typeof newInventory] = hub;
                return newInventory;
            }

            return prev;
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Inventory Logistics</h1>
                    <p className="text-muted-foreground">Warehouse → Facility Nodes → Peer Distribution</p>
                </div>
                 <div className="flex gap-2 flex-wrap">
                    <Button variant="outline"><History className="mr-2"/> Audit Logs</Button>
                    <Button variant="outline" onClick={() => { setDialogMode('entry'); setIsDialogOpen(true); }}>
                        <PlusCircle className="mr-2"/> New Stock Entry
                    </Button>
                    <Button onClick={() => { setDialogMode('action'); setIsDialogOpen(true); }}>
                        <ArrowLeftRight className="mr-2"/> Dispense / Return
                    </Button>
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
                                    <CommodityCard key={item.id} item={item} hubName={hubData.name} />
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
             {dialogMode && (
                <StockActionDialog
                    key={`${activeTab}-${dialogMode}`} // Force re-mount to reset state
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    mode={dialogMode}
                    hubData={activeHubData}
                    microplanners={microplanners}
                    onSubmit={(updates) => handleStockUpdate(activeTab, updates)}
                />
            )}
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

function CommodityCard({ item, hubName }: { item: Item, hubName: string }) {
    const stockLevel = item.capacity > 0 ? (item.inHand / item.capacity) * 100 : 0;
    
    return (
        <Card>
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
                        <Label htmlFor={`progress-${item.id}`} className="text-xs">STOCK LEVEL</Label>
                        <span className="text-xs font-semibold">{Math.round(stockLevel)}%</span>
                    </div>
                    <Progress id={`progress-${item.id}`} value={stockLevel} />
                </div>
            </CardContent>
        </Card>
    );
}

function StockActionDialog({ open, onOpenChange, mode, hubData, microplanners, onSubmit }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: 'entry' | 'action';
    hubData: HubData;
    microplanners: { id: string; name: string }[];
    onSubmit: (updates: StockUpdatePayload) => void;
}) {
    const [actionType, setActionType] = useState('dispense');
    const [selectedPlanner, setSelectedPlanner] = useState('');
    const [quantities, setQuantities] = useState<Record<string, string>>({});
    const { toast } = useToast();

    useEffect(() => {
        if (open) {
            setQuantities({});
            setSelectedPlanner('');
            setActionType('dispense');
        }
    }, [open]);

    const handleSubmit = () => {
        const items = Object.entries(quantities)
            .map(([itemId, amount]) => ({ itemId, amount: parseInt(amount) || 0 }))
            .filter(item => item.amount > 0);

        if (mode === 'action' && !selectedPlanner) {
            toast({ variant: "destructive", title: "Missing Information", description: "Please select a microplanner." });
            return;
        }

        if (items.length === 0) {
            toast({ variant: "destructive", title: "Missing Information", description: "Please enter a quantity for at least one item." });
            return;
        }

        const payload: StockUpdatePayload = {
            type: mode === 'entry' ? 'entry' : actionType as 'dispense' | 'return',
            items: items,
            ...(mode === 'action' && { microplanner: selectedPlanner })
        };
        
        onSubmit(payload);
        onOpenChange(false);
    };

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>{mode === 'entry' ? 'New Stock Entry (from Warehouse)' : 'New Stock Action'}</DialogTitle>
                <DialogDescription>
                    {mode === 'entry' ? 'Record new items received from the main warehouse.' : 'Dispense items to or receive returns from a microplanner.'}
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
                {mode === 'action' && (
                    <>
                        <div className="space-y-2">
                            <Label>Action Type</Label>
                            <RadioGroup value={actionType} onValueChange={setActionType} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="dispense" id="dispense" />
                                    <Label htmlFor="dispense">Dispense to Peer</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="return" id="return" />
                                    <Label htmlFor="return">Return from Peer</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
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
                        <Separator className="my-4"/>
                    </>
                )}
                <h4 className="font-medium text-sm">Commodities</h4>
                <div className="grid gap-4 max-h-60 overflow-y-auto p-1">
                {hubData.items.map(item => (
                    <div key={item.id} className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor={`item-${item.id}`} className="col-span-2">{item.name} <span className="text-xs text-muted-foreground">({item.inHand})</span></Label>
                        <Input 
                            id={`item-${item.id}`} 
                            type="number"
                            placeholder="0"
                            min="0"
                            value={quantities[item.id] || ''}
                            onChange={e => setQuantities(prev => ({ ...prev, [item.id]: e.target.value }))}
                            className="text-right"
                        />
                    </div>
                ))}
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Confirm</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}
