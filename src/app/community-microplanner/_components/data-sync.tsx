'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";

export function DataSync() {
    const [isOnline, setIsOnline] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSync, setLastSync] = useState<Date | null>(new Date(Date.now() - 15 * 60 * 1000));

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        // Initial check
        setIsOnline(navigator.onLine);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setLastSync(new Date());
            setIsSyncing(false);
        }, 2000);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><RefreshCw /> Data Synchronization</CardTitle>
                <CardDescription>Sync your local field data with the central server.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center space-y-4 pt-10 pb-10">
                {isOnline ? (
                    <Wifi className="w-16 h-16 text-green-500" />
                ) : (
                    <WifiOff className="w-16 h-16 text-destructive" />
                )}
                <h3 className="text-xl font-semibold">{isOnline ? "You are online" : "You are offline"}</h3>
                <p className="text-muted-foreground">
                    {isOnline ? "Your connection to the server is active." : "Please check your internet connection to sync data."}
                </p>
                <Button onClick={handleSync} disabled={!isOnline || isSyncing} className="w-full max-w-xs">
                    {isSyncing ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Syncing...</>
                    ) : (
                        <><RefreshCw className="mr-2 h-4 w-4" /> Sync Now</>
                    )}
                </Button>
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-muted-foreground w-full text-center">
                    {lastSync ? `Last sync: ${lastSync.toLocaleTimeString()}` : "No sync data available."}
                </p>
            </CardFooter>
        </Card>
    );
}
