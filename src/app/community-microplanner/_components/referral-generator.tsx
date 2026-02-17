'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Clipboard, RefreshCw } from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

export function ReferralGenerator() {
    const { toast } = useToast();
    const [peerName, setPeerName] = useState("");
    const [referralId, setReferralId] = useState("");

    const generateId = () => {
        const newId = `REF-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
        setReferralId(newId);
    };

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        generateId();
    }

    const copyToClipboard = (text: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast({
          title: "Referral ID copied to clipboard!",
        });
    };

    return (
        <Card id="refer">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><QrCode/> Referral Handshake</CardTitle>
                <CardDescription>Issue a digital referral for a peer to a facility.</CardDescription>
            </CardHeader>
            <form onSubmit={handleGenerate}>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="peer-name">Peer's Name or ID (Optional)</Label>
                        <Input id="peer-name" placeholder="e.g., Jane D. or #56GHY" value={peerName} onChange={(e) => setPeerName(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4"/>
                        Generate New Referral ID
                    </Button>
                </CardContent>
            </form>
            {referralId && (
                <CardFooter className="flex flex-col items-start gap-4 border-t pt-6">
                    <div className="w-full space-y-2">
                        <Label htmlFor="referral-id">Generated Referral ID</Label>
                        <div className="relative">
                            <Input id="referral-id" value={referralId} readOnly className="text-lg font-bold tracking-widest text-center" />
                            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => copyToClipboard(referralId)}>
                                <Clipboard className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">Share this ID with the peer to present at the facility.</p>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
