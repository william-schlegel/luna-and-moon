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
import { getSession } from '@/lib/auth-client';

export async function SignedIn({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const { data } = await getSession();
  if (!data) return null;
  return <>{children}</>;
}

export async function SignedOut({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const { data } = await getSession();
  if (data) return null;
  return <>{children}</>;
}

export function SignInButton() {
  return <Link href="/sign-in">Se connecter</Link>;
}

export async function UserButton() {
  const { data } = await getSession();
  if (!data) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={data?.user.image ?? ''} alt={data?.user.name} />
          <AvatarFallback>
            {data?.user.name.split(' ').map((w) => w.at(0)) ?? '??'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{'Mon compte'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Facturation</DropdownMenuItem>
        <DropdownMenuItem>Plan</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Déconnexion</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
