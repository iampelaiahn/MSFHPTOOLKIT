'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Clipboard, RefreshCw, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function ReferralGenerator() {
    const { toast } = useToast();
    const firestore = useFirestore();
    const [peerName, setPeerName] = useState("");
    const [referralId, setReferralId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const generateId = async () => {
        if (!firestore) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Firestore is not available. Please try again later.",
            });
            return;
        }
        setIsLoading(true);

        const newId = `REF-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
        const referralDate = new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        try {
            const referralsCollection = collection(firestore, "referrals");
            await addDoc(referralsCollection, {
                peerName: peerName || "Anonymous",
                referralId: newId,
                referralDate: serverTimestamp(),
                month: monthNames[referralDate.getMonth()],
                linked: false,
                linkageDate: null,
            });
            
            setReferralId(newId);
            toast({
              title: "Referral ID Generated!",
              description: "The new referral has been saved.",
            });

        } catch (error) {
            console.error("Error adding document: ", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not save the referral. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
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
                        <Input id="peer-name" placeholder="e.g., Jane D. or #56GHY" value={peerName} onChange={(e) => setPeerName(e.target.value)} disabled={isLoading} />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                         {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                         ) : (
                            <><RefreshCw className="mr-2 h-4 w-4"/> Generate New Referral ID</>
                         )}
                    </Button>
                </CardContent>
            </form>
            {referralId && !isLoading && (
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
