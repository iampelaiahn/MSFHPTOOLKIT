'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HP_MonthlySitRepInput, HP_MonthlySitRepOutput, generateHpMonthlySitRep } from "@/ai/flows/hp-monthly-sitrep-flow";
import { Bot, Loader2, FileWarning, BarChart, Users, Target, Droplets, Gift, ClipboardList, Upload, FileDown, Share2, Pencil, Check, Trash2, PlusCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Mock data based on the new schema
const mockReportInput: HP_MonthlySitRepInput = {
    report_metadata: {
        title: "Health Promotion Monthly Medical SitReport",
        project: "Mbare Project",
        department: "HEALTH PROMOTION",
        period: "July 2025"
    },
    data: {
        in_facility_metrics: {
            total_reached: 1850,
            group_sessions_count: 50,
            reach_by_category: {
                SW: 300,
                General_Adolescents: 1400,
                LGBTIQ: 100,
                Drug_Users: 50,
            }
        },
        out_of_facility_metrics: {
            total_reached_out_of_facility: 1685,
            reach_by_method: {
                DHP: 800,
                Face_to_face: 685,
                Outreach: 100,
                Group_sessions: 100,
            }
        },
        health_services_cascade: {
            HIVST_offered: 450,
            HIVST_reactive: 25,
            HIVST_linkage_to_prevention: 20,
            Pregnancy_tests_total: 200,
            Pregnancy_tests_positive: 30,
            Referrals: {
                ANC: 28,
                FP: 15,
            }
        },
        less_medicalized_model: {
            condom_programming_reach: 520,
            ECP_reach: 7,
            menstrual_health_commodities_reach: 179,
            commemorated_events_list: ["Ward 7 outreach", "Collaboration with GALZ"],
        }
    }
};

export function AIReportGenerator() {
  const [result, setResult] = useState<HP_MonthlySitRepOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState(mockReportInput.report_metadata);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editableResult, setEditableResult] = useState<HP_MonthlySitRepOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await generateHpMonthlySitRep(mockReportInput);
      setResult(output);
    } catch (err) {
      setError("Failed to generate the SitRep. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    if (!result) return;
    setEditableResult(JSON.parse(JSON.stringify(result)));
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableResult(null);
  };

  const handleSave = () => {
    if (!editableResult) return;
    setResult(editableResult);
    setIsEditing(false);
    setEditableResult(null);
    toast({
      title: "Report Updated",
      description: "Your changes have been saved locally.",
    });
  };

  const handleChallengesChange = (index: number, field: 'challenge' | 'action', value: string) => {
    if (!editableResult) return;
    const newResult = { ...editableResult };
    newResult.operationalSummary.challengesTable[index][field] = value;
    setEditableResult(newResult);
  };

  const handleAddChallenge = () => {
    if (!editableResult) return;
    const newResult = { ...editableResult };
    newResult.operationalSummary.challengesTable.push({ challenge: '', action: '' });
    setEditableResult(newResult);
  };

  const handleDeleteChallenge = (index: number) => {
    if (!editableResult) return;
    const newResult = { ...editableResult };
    newResult.operationalSummary.challengesTable.splice(index, 1);
    setEditableResult(newResult);
  };

  const handlePlansChange = (index: number, value: string) => {
    if (!editableResult) return;
    const newResult = { ...editableResult };
    newResult.operationalSummary.nextMonthPlans[index] = value;
    setEditableResult(newResult);
  };

  const handleAddPlan = () => {
    if (!editableResult) return;
    const newResult = { ...editableResult };
    newResult.operationalSummary.nextMonthPlans.push('');
    setEditableResult(newResult);
  };

  const handleDeletePlan = (index: number) => {
    if (!editableResult) return;
    const newResult = { ...editableResult };
    newResult.operationalSummary.nextMonthPlans.splice(index, 1);
    setEditableResult(newResult);
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Promotion Monthly Medical SitReport</CardTitle>
        <CardDescription>
          Generate the {metadata.period} SitReport for the {metadata.project} project.
        </CardDescription>
      </CardHeader>
      <CardContent>
          <div className="flex items-center gap-4">
            <Button onClick={handleSubmit} disabled={isLoading || isEditing}>
                {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Report...
                </>
                ) : (
                <>
                    <Bot className="mr-2 h-4 w-4" />
                    Generate HP Monthly SitRep
                </>
                )}
            </Button>
            {result && !isEditing && (
              <>
                <Button variant="outline" onClick={handleEdit}>
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Upload className="mr-2 h-4 w-4" /> Publish
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <FileDown className="mr-2 h-4 w-4" /> Export
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" /> Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <ClipboardList className="mr-2 h-4 w-4" /> Post
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
             {isEditing && (
                <>
                    <Button onClick={handleSave}>
                        <Check className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                    <Button variant="ghost" onClick={handleCancel}>
                        Cancel
                    </Button>
                </>
            )}
          </div>
      </CardContent>
      
      {error && (
        <CardFooter>
            <Alert variant="destructive">
                <FileWarning className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </CardFooter>
      )}
      
      {result && (
        <CardContent className="space-y-8">
            <Separator />
            {/* In-facility */}
            <section>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-4"><Users/> Expected Result 1A (In-Facility)</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <KpiCard title="Total Adolescents Reached" value={result.inFacility.totalReached.toLocaleString()} target={result.inFacility.target.toLocaleString()} />
                    <KpiCard title="Group HP Sessions" value={result.inFacility.groupSessions.toLocaleString()} />
                    <KpiCard title="SW Reached" value={result.inFacility.reachSW.toLocaleString()} />
                    <KpiCard title="Drug Users Reached" value={result.inFacility.reachDrugUsers.toLocaleString()} />
                </div>
            </section>

             {/* Out-of-facility */}
            <section>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-4"><Target/> Expected Result 2 (Out-of-Facility)</h3>
                <p className="text-muted-foreground mb-4">{result.outOfFacility.summary}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><BarChart/> Reach Means</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ResponsiveContainer width="100%" height={250}>
                                <RechartsBarChart data={result.outOfFacility.reachMeansChartData}>
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }} />
                                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><Droplets/> Linkage to Care</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableBody>
                                    {result.outOfFacility.linkageToCareTable.map(row => (
                                        <TableRow key={row.indicator}>
                                            <TableCell className="font-medium">{row.indicator}</TableCell>
                                            <TableCell className="text-right font-bold">{row.result}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </section>

             {/* Less Medicalized */}
             <section>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-4"><Gift/> Expected Result 5 & 6</h3>
                 <div className="grid gap-4 md:grid-cols-3">
                    <KpiCard title="Condoms Distributed" value={result.lessMedicalizedModel.condomsDistributed.toLocaleString()} />
                    <KpiCard title="ECP Distributed" value={result.lessMedicalizedModel.ecpDistributed.toLocaleString()} />
                    <KpiCard title="Menstrual Hygiene Kits" value={result.lessMedicalizedModel.menstrualHygieneDistributed.toLocaleString()} />
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Outreach Events:</h4>
                    <ul className="list-disc pl-5 text-muted-foreground">
                        {result.lessMedicalizedModel.outreachEvents.map((event, i) => <li key={i}>{event}</li>)}
                    </ul>
                </div>
            </section>
            
            {/* Operational Summary */}
            <section>
                <h3 className="text-xl font-semibold flex items-center gap-2 mb-4"><ClipboardList/> Operational Summary</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-lg">Challenges & Actions</CardTitle>
                             {isEditing && (
                                <Button variant="outline" size="sm" onClick={handleAddChallenge}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Challenge</TableHead>
                                        <TableHead>Action Taken</TableHead>
                                        {isEditing && <TableHead className="w-[50px]"></TableHead>}
                                    </TableRow>
                                </TableHeader>
                                 <TableBody>
                                    {(isEditing ? editableResult! : result).operationalSummary.challengesTable.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {isEditing ? (
                                                    <Input value={row.challenge} onChange={(e) => handleChallengesChange(index, 'challenge', e.target.value)} />
                                                ) : row.challenge}
                                            </TableCell>
                                            <TableCell>
                                                {isEditing ? (
                                                    <Input value={row.action} onChange={(e) => handleChallengesChange(index, 'action', e.target.value)} />
                                                ) : row.action}
                                            </TableCell>
                                            {isEditing && (
                                                <TableCell>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteChallenge(index)}>
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-lg">Next Month’s Plans</CardTitle>
                             {isEditing && (
                                <Button variant="outline" size="sm" onClick={handleAddPlan}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {(isEditing ? editableResult! : result).operationalSummary.nextMonthPlans.map((plan, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        {isEditing ? (
                                            <>
                                                <Input value={plan} onChange={(e) => handlePlansChange(i, e.target.value)} className="flex-grow" />
                                                <Button variant="ghost" size="icon" onClick={() => handleDeletePlan(i)}>
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </>
                                        ) : (
                                            <span className="text-muted-foreground before:content-['•'] before:mr-2 before:inline-block">{plan}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

        </CardContent>
      )}
    </Card>
  );
}

function KpiCard({ title, value, target }: { title: string, value: string, target?: string }) {
    const isTargetApplicable = target !== undefined;
    const valueNum = parseFloat(value.replace(/,/g, ''));
    const targetNum = target ? parseFloat(target.replace(/,/g, '')) : 0;
    const progress = isTargetApplicable ? (valueNum / targetNum) * 100 : 0;

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {isTargetApplicable && (
                    <p className="text-xs text-muted-foreground">
                        Target: {target} ({Math.round(progress)}%)
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
