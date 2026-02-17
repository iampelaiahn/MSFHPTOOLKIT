import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarClock } from "lucide-react";

const appointments = [
  { peerId: "#1A2B3C", service: "PrEP Refill", date: "2024-08-15", time: "10:00 AM", risk: "High" },
  { peerId: "#4D5E6F", service: "ART Follow-up", date: "2024-08-15", time: "02:30 PM", risk: "High" },
  { peerId: "#7G8H9I", service: "STI Screening", date: "2024-08-16", time: "11:00 AM", risk: "Medium" },
  { peerId: "#J1K2L3", service: "Counseling", date: "2024-08-18", time: "09:00 AM", risk: "Low" },
];

export function AppointmentTracker() {
  const getRiskBadge = (risk: string) => {
    switch(risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      default: return 'default';
    }
  }

  return (
    <Card id="appointments">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><CalendarClock /> Appointment Tracker</CardTitle>
        <CardDescription>Manage follow-ups for high-risk KPs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Peer ID</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.peerId}>
                <TableCell>
                  <div className="font-medium">{appt.peerId}</div>
                  <div className="text-sm text-muted-foreground">{appt.service}</div>
                </TableCell>
                <TableCell>
                  <div>{appt.date}</div>
                  <div className="text-sm text-muted-foreground">{appt.time}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRiskBadge(appt.risk)}>{appt.risk}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
