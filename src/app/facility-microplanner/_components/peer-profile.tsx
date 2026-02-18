'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Search, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PeerProfile() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><User /> Peer Profile</CardTitle>
                <CardDescription>Search for and view peer profiles and clinical history.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="text" placeholder="Enter Peer ID or Name" />
                    <Button type="submit">
                        <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                </div>
                <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center mt-6 h-64 bg-background/50">
                     <div className="flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-4">
                        <User className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Search for a peer to view their clinical profile.</p>
                </div>
            </CardContent>
        </Card>
    );
}
