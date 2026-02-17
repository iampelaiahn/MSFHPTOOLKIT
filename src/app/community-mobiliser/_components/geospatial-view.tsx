'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Marker } from '@vis.gl/react-google-maps';
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const hotspots = [
    { id: 1, lat: -1.286389, lng: 36.817223, intensity: 0.8 },
    { id: 2, lat: -1.292066, lng: 36.821945, intensity: 0.5 },
    { id: 3, lat: -1.283333, lng: 36.816667, intensity: 0.9 },
    { id: 4, lat: -1.303193, lng: 36.828209, intensity: 0.3 },
];

export function GeospatialView() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Hotspot Coverage</CardTitle>
                <CardDescription>Geospatial view of hotspot activity and outreach coverage.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <div className="absolute top-4 left-4 z-10 rounded-lg border bg-card p-2 shadow-lg">
                        <RadioGroup defaultValue="hotspots" className="flex gap-4">
                            <div className="flex items-center space-x-2">
                            <RadioGroupItem value="hotspots" id="r1" />
                            <Label htmlFor="r1">Hotspots</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                            <RadioGroupItem value="tracker" id="r2" />
                            <Label htmlFor="r2">Tracker</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="h-[500px] w-full rounded-lg overflow-hidden border">
                        <Map
                            defaultCenter={{ lat: -1.292066, lng: 36.821945 }}
                            defaultZoom={13}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                            mapId="outreachrx_map"
                        >
                            {hotspots.map(hotspot => (
                                <Marker key={hotspot.id} position={{ lat: hotspot.lat, lng: hotspot.lng }} />
                            ))}
                        </Map>
                    </div>
                </div>
                 <p className="text-xs text-muted-foreground mt-2">Heatmap layer visualization coming soon.</p>
            </CardContent>
        </Card>
    );
}
