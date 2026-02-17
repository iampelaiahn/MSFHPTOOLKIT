import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin } from "lucide-react";

const tasks = [
    { id: 'task1', text: "Visit 'The Watering Hole' hotspot", completed: false },
    { id: 'task2', text: "Follow-up with Peer ID #34FDE", completed: false },
    { id: 'task3', text: "Distribute 5 HIVST kits", completed: true },
    { id: 'task4', text: "Conduct health education session at 'Sunset Bar'", completed: false },
];

export function TaskList() {
    return (
        <Card id="hotspots">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin /> Today's Tasks & Hotspots</CardTitle>
                <CardDescription>Your plan for the day. Stay safe and make a difference!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {tasks.map(task => (
                        <div key={task.id} className="flex items-center space-x-3 rounded-md border p-4">
                            <Checkbox id={task.id} checked={task.completed} />
                            <label
                                htmlFor={task.id}
                                className={`flex-1 text-sm font-medium leading-none ${task.completed ? 'line-through text-muted-foreground' : ''} peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                            >
                                {task.text}
                            </label>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
