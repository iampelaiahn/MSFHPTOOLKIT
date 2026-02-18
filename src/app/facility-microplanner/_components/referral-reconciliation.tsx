'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Search, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ReferralReconciliation() {
    const [referralId, setReferralId] = useState("");
    const [foundPeer, setFoundPeer] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setFoundPeer(null);

        if (referralId.toUpperCase() === 'REF-ABC12345') {
            setFoundPeer("Peer ID #34FDE (John D.)");
        } else {
            setError("Referral ID not found. Please check the ID and try again.");
        }
    };
    
    return (
        <Card id="reconciliation">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><QrCode/> Referral Reconciliation</CardTitle>
                <CardDescription>"Check in" peers referred by community microplanners.</CardDescription>
            </CardHeader>
             <form onSubmit={handleSearch}>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="referral-id-search">Enter Referral ID</Label>
                        <Input 
                            id="referral-id-search" 
                            placeholder="e.g., REF-ABC12345" 
                            value={referralId}
                            onChange={(e) => setReferralId(e.target.value)}
                        />
                    </div>
                     <Button type="submit" className="w-full">
                        <Search className="mr-2 h-4 w-4"/>
                        Find Peer
                    </Button>
                </CardContent>
            </form>
            <CardFooter className="flex flex-col items-start gap-4 border-t pt-6">
                 {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {foundPeer && (
                    <Alert variant="default" className="border-primary/50">
                        <CheckCircle className="h-4 w-4 !text-primary" />
                        <AlertTitle className="text-primary">Peer Found & Linked!</AlertTitle>
                        <AlertDescription>
                            Successfully linked <span className="font-bold">{foundPeer}</span>. The Community Health Mobiliser dashboard has been updated.
                        </AlertDescription>
                    </Alert>
                )}
            </CardFooter>
        </Card>
    );
}
