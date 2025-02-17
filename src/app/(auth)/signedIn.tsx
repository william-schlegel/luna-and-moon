import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/auth-client';

export async function SignedIn({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) return null;
  return <>{children}</>;
}

export async function SignedOut({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (session) return null;
  return <>{children}</>;
}

export function SignInButton() {
  return (
    <Link href="/sign-in">
      <Button>Se connecter</Button>
    </Link>
  );
}

export async function UserButton() {
  const session = await getSession();
  if (!session) return null;

  return (
    <Avatar>
      <AvatarImage
        src={session.data?.user.image ?? ''}
        alt={session.data?.user.name}
      />
      <AvatarFallback>
        {session.data?.user.name.split(' ').map((w) => w.at(0)) ?? '??'}
      </AvatarFallback>
    </Avatar>
  );
}
