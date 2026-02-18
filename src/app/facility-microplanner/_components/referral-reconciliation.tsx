'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Search, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFirestore } from "@/firebase";
import { collection, query, where, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { Referral } from "@/lib/types";

export function ReferralReconciliation() {
    const firestore = useFirestore();
    const [referralId, setReferralId] = useState("");
    const [foundPeer, setFoundPeer] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAlreadyLinked, setIsAlreadyLinked] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setFoundPeer(null);
        setIsAlreadyLinked(false);
        setIsLoading(true);

        if (!firestore) {
            setError("Database connection not available.");
            setIsLoading(false);
            return;
        }

        try {
            const referralsCollection = collection(firestore, "referrals");
            const q = query(referralsCollection, where("referralId", "==", referralId.trim().toUpperCase()));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setError("Referral ID not found. Please check the ID and try again.");
            } else {
                const referralDoc = querySnapshot.docs[0];
                const referralData = referralDoc.data() as Referral;

                if (referralData.linked) {
                    setFoundPeer(`${referralData.peerName}`);
                    setIsAlreadyLinked(true);
                } else {
                    const docRef = doc(firestore, "referrals", referralDoc.id);
                    await updateDoc(docRef, {
                        linked: true,
                        linkageDate: serverTimestamp()
                    });
                    setFoundPeer(referralData.peerName);
                    setIsAlreadyLinked(false);
                }
            }
        } catch (err) {
            console.error("Error searching for referral: ", err);
            setError("An error occurred while searching for the referral.");
        } finally {
            setIsLoading(false);
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
                            disabled={isLoading}
                        />
                    </div>
                     <Button type="submit" className="w-full" disabled={isLoading || !referralId}>
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching...</>
                        ) : (
                            <><Search className="mr-2 h-4 w-4"/> Find Peer</>
                        )}
                    </Button>
                </CardContent>
            </form>
            {(error || foundPeer) && (
                <CardFooter className="flex flex-col items-start gap-4 border-t pt-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {foundPeer && (
                         <Alert variant={isAlreadyLinked ? "default" : "success"}>
                            <CheckCircle className={`h-4 w-4 ${isAlreadyLinked ? '' : '!text-primary'}`} />
                            <AlertTitle className={isAlreadyLinked ? '' : 'text-primary'}>
                                {isAlreadyLinked ? "Peer Already Linked" : "Peer Found & Linked!"}
                            </AlertTitle>
                            <AlertDescription>
                                {isAlreadyLinked ? 
                                    <>The referral for <span className="font-bold">{foundPeer}</span> has already been reconciled.</> :
                                    <>Successfully linked <span className="font-bold">{foundPeer}</span>. The Community Health Mobiliser dashboard has been updated.</>
                                }
                            </AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}
