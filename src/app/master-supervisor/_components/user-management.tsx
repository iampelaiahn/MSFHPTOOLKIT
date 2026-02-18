import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, UserPlus } from "lucide-react";

const users = [
  { name: "Amina Yusuf", email: "amina.yusuf@example.com", role: "Community Health Mobiliser", status: "Active" },
  { name: "John Doe", email: "john.doe@example.com", role: "Community-Based Microplanner", status: "Active" },
  { name: "Jane Smith", email: "jane.smith@example.com", role: "Facility-Based Microplanner", status: "Active" },
  { name: "Admin User", email: "admin@outreachrx.com", role: "Master Supervisor", status: "Active" },
  { name: "Peter Jones", email: "peter.jones@example.com", role: "Community-Based Microplanner", status: "Inactive" },
];

export function UserManagement() {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Master Supervisor": return "default";
      case "Community Health Mobiliser": return "secondary";
      case "Community-Based Microplanner": return "outline";
      case "Facility-Based Microplanner": return "outline";
      default: return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Create users and assign roles.</CardDescription>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "Active" ? "outline" : "destructive"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Deactivate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
