'use client';
import { APIProvider } from '@vis.gl/react-google-maps';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TriangleAlert } from 'lucide-react';

export function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <Card>
        <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center bg-muted/50 h-96 rounded-lg border-2 border-dashed">
                <TriangleAlert className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground">Google Maps Not Configured</h3>
                <p className="text-muted-foreground">Please provide a Google Maps API key in your environment variables.</p>
                <code className="mt-4 p-2 rounded bg-background text-sm">.env.local.example: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE</code>
            </div>
        </CardContent>
      </Card>
    );
  }

  return <APIProvider apiKey={apiKey}>{children}</APIProvider>;
}
