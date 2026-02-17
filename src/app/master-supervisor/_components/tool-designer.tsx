import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus, GripVertical, Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tools = [
  {
    name: "Standard Risk Assessment",
    description: "The 6-point scoring algorithm for KP risk.",
    type: "Community",
    version: "1.2",
    status: "Published",
  },
  {
    name: "HIVST Register",
    description: "Log for self-test kit distribution and results.",
    type: "Community",
    version: "2.0",
    status: "Published",
  },
  {
    name: "Referral Reconciliation",
    description: "Form for facility-based 'check-ins' of referred peers.",
    type: "Facility",
    version: "1.0",
    status: "Published",
  },
  {
    name: "Clinical Service Log",
    description: "Record of services delivered at the facility (ART, PrEP).",
    type: "Facility",
    version: "1.5",
    status: "Draft",
  },
];

export function ToolDesigner() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Dynamic Tool Designer</CardTitle>
                <CardDescription>Create, edit, and deploy data collection forms.</CardDescription>
            </div>
            <Button>
                <FilePlus className="mr-2 h-4 w-4"/>
                New Tool
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tools.map((tool, index) => (
            <Card key={index} className="flex items-center p-4">
                <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-grab" />
                <div className="flex-grow">
                    <div className="flex items-center gap-4">
                        <h3 className="font-semibold">{tool.name}</h3>
                        <Badge variant={tool.type === 'Community' ? 'secondary' : 'outline'}>{tool.type}</Badge>
                         <Badge variant="outline">v{tool.version}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                    <Badge variant={tool.status === 'Published' ? 'default' : 'destructive'} className={tool.status === 'Published' ? 'bg-green-600' : 'bg-amber-500'}>{tool.status}</Badge>
                    <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Drag and drop to reorder tools.</p>
      </CardFooter>
    </Card>
  );
}
