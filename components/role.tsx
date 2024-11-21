import { auth } from '@clerk/nextjs/server';

import { getTierByName } from '@/data/subscriptionTiers';
import { getUserSubscription } from '@/server/db/userSubscrption';

import { Badge } from './ui/badge';

export const OrgMembersParams = {
  memberships: {
    pageSize: 5,
    keepPreviousData: true
  }
};

export default async function Role() {
  const { sessionClaims, userId } = await auth();
  if (!userId) return null;
  const role = sessionClaims?.role ?? 'user';
  const isAdmin = role === 'admin';
  const subscription = await getUserSubscription(userId);

  return (
    <Badge variant={isAdmin ? 'destructive' : 'outline'}>
      <div className="flex gap-1">
        <span className="capitalize">{role}</span>
        <span>/</span>
        <span>{getTierByName(subscription?.tier)}</span>
      </div>
    </Badge>
  );
}

export async function IsAdmin({ children }: { children: React.ReactNode }) {
  const hasAdminRole = await isAdmin();
  return hasAdminRole ? <>{children}</> : null;
}

export async function IsUser({ children }: { children: React.ReactNode }) {
  const hasAdminRole = await isAdmin();
  return hasAdminRole ? null : <>{children}</>;
}

export async function IsVisitor({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  return userId ? null : <>{children}</>;
}

export async function IsConnected({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  return userId ? <>{children}</> : null;
}

export async function IsArtistOrAdmin({
  children
}: {
  children: React.ReactNode;
}) {
  const hasAdminRole = await isAdmin();
  const hasArtistSubscription = await isArtist();

  return hasArtistSubscription || hasAdminRole ? <>{children}</> : null;
}

export async function isAdmin() {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.role ?? 'user';
  const isAdmin = role === 'admin';
  return isAdmin;
}

export async function isArtist() {
  const { userId } = await auth();
  if (!userId) return false;
  const subscription = await getUserSubscription(userId);
  const isArtist =
    subscription?.tier === 'Artist' ||
    subscription?.tier === 'AdvancedArtist' ||
    subscription?.tier === 'ArtistFree';

  return isArtist;
}
