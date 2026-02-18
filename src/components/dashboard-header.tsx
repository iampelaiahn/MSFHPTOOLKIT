import {
  Bell,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { ClientOnly } from '@/components/client-only';

type DashboardHeaderProps = {
  title: string;
  user: {
    name: string;
    avatarId: string;
  };
};

export function DashboardHeader({ title, user }: DashboardHeaderProps) {
  const avatar = PlaceHolderImages.find((img) => img.id === user.avatarId);
  const avatarFallback = user.name.charAt(0);

  const UserMenuSkeleton = (
    <Button variant="secondary" size="icon" className="rounded-full" disabled>
       <Avatar className="h-8 w-8">
           <AvatarFallback>{avatarFallback}</AvatarFallback>
       </Avatar>
    </Button>
 );

  return (
    <header className="fixed top-0 right-0 left-0 z-30 flex h-16 items-center gap-4 border-b border-transparent bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-card/50"
            />
          </div>
        </form>
        <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
        </Button>
        <ClientOnly fallback={UserMenuSkeleton}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} data-ai-hint={avatar.imageHint} />}
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ClientOnly>
      </div>
    </header>
  );
}
