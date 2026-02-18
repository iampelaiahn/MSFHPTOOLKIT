'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Network } from "lucide-react";

export function SocialNetworkMap() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Network /> Social Network Map</CardTitle>
                <CardDescription>Visualize peer relationships for contextual understanding.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center mt-6 h-96 bg-background/50">
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-4">
                        <Network className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Social Network Map view coming soon for facility planners.</p>
                </div>
            </CardContent>
        </Card>
    );
}
