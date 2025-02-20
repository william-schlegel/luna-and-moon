import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { getActualUser, getSessionServer } from '@/lib/auth';

export async function SignedIn({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSessionServer();
  console.log('signed in session :>> ', session);
  if (!session) return null;
  return <>{children}</>;
}

export async function SignedOut({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSessionServer();
  console.log('signed out session :>> ', session);

  if (session) return null;
  return <>{children}</>;
}

export function SignInButton() {
  return <Link href="/sign-in">Se connecter</Link>;
}

export async function UserButton() {
  const user = await getActualUser();
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.image ?? ''} alt={user.name} />
          <AvatarFallback>
            {user.name.split(' ').map((w) => w.at(0)) ?? '??'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{'Mon compte'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Compte</DropdownMenuItem>
        <DropdownMenuItem>Facturation</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Déconnexion</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
