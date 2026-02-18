'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Link2, Share2, User, UserPlus, Zap } from "lucide-react";

const nodes = [
  { id: 'sarah', name: 'SARAH', role: 'LEADER', x: '60%', y: '20%' },
  { id: 'mercy', name: 'MERCY', role: 'INFLUENCER', x: '75%', y: '50%' },
  { id: 'clara', name: 'CLARA', role: 'LEADER', x: '60%', y: '80%' },
  { id: 'john', name: 'JOHN', role: 'KP', x: '25%', y: '55%' },
];

const links = [
  { from: 'sarah', to: 'mercy', type: 'strong' },
  { from: 'clara', to: 'mercy', type: 'strong' },
  { from: 'john', to: 'mercy', type: 'weak' },
];

const Node = ({ node }: { node: typeof nodes[number] }) => {
  const getRoleStyles = () => {
    switch(node.role) {
      case 'LEADER':
        return {
          icon: <div className="w-12 h-12 rounded-full border-2 border-orange-500 bg-card flex items-center justify-center"><User className="w-6 h-6 text-orange-500" /></div>,
          label: '(LEADER)',
          textColor: 'text-orange-400'
        };
      case 'INFLUENCER':
        return {
          icon: <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center"><Zap className="w-6 h-6 text-blue-300" /></div>,
          label: '(INFLUENCER)',
          textColor: 'text-blue-300'
        };
      case 'KP':
        return {
          icon: <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center"><User className="w-6 h-6 text-red-400" /></div>,
          label: '(KP)',
          textColor: 'text-red-400'
        };
      default:
        return {
          icon: <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><User className="w-6 h-6 text-muted-foreground" /></div>,
          label: '',
          textColor: 'text-muted-foreground'
        };
    }
  }

  const { icon, label, textColor } = getRoleStyles();

  return (
    <div className="absolute text-center" style={{ top: node.y, left: node.x, transform: 'translate(-50%, -50%)' }}>
      {icon}
      <p className={`mt-2 text-xs font-semibold ${textColor}`}>{node.name} <span className="text-muted-foreground">{label}</span></p>
    </div>
  );
}


export function SocialNetworkMap() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Info /> Map Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-muted-foreground">
                       <ol className="list-decimal list-inside space-y-2">
                           <li><span className="font-semibold text-foreground">Drag Nodes:</span> Reposition people to organize trust clusters.</li>
                           <li><span className="font-semibold text-foreground">Establish Bridges:</span> Use the bridge tool to connect peers who trust each other.</li>
                           <li><span className="font-semibold text-foreground">Identify Leaders:</span> Spot high-influence nodes (accent rings) to prioritize mobilization.</li>
                       </ol>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Share2 /> Relationship Legend</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-1 bg-orange-500 rounded-full" />
                            <span className="text-sm font-medium">CRITICAL LEADER</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-1 bg-blue-400 rounded-full" />
                            <span className="text-sm font-medium">STRONG TRUST</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-[2px] bg-muted-foreground border-t-2 border-b-2 border-dashed border-background" />
                            <span className="text-sm font-medium">WEAK/NEW</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Social Network Map</CardTitle>
                        <CardDescription>Visualize peer relationships and trust bridges</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-2">
                                <Button variant="outline"><UserPlus className="mr-2"/> Add Peer Node</Button>
                                <Button><Link2 className="mr-2"/> Establish Bridge</Button>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted-foreground">INTEGRITY SCORE</p>
                                <p className="text-2xl font-bold text-primary">2.0</p>
                            </div>
                        </div>
                        <div className="relative h-[600px] w-full rounded-lg border bg-background/50 overflow-hidden">
                             <svg className="absolute inset-0 h-full w-full" width="100%" height="100%">
                                {links.map((link, i) => {
                                    const fromNode = nodes.find(n => n.id === link.from);
                                    const toNode = nodes.find(n => n.id === link.to);
                                    if (!fromNode || !toNode) return null;

                                    return (
                                        <line
                                            key={i}
                                            x1={fromNode.x}
                                            y1={fromNode.y}
                                            x2={toNode.x}
                                            y2={toNode.y}
                                            stroke={link.type === 'strong' ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                                            strokeWidth={link.type === 'strong' ? 2 : 1}
                                            strokeDasharray={link.type === 'weak' ? "5,5" : "none"}
                                        />
                                    );
                                })}
                            </svg>
                            {nodes.map(node => <Node key={node.id} node={node} />)}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
