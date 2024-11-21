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
  const roles = sessionClaims?.roles ?? ['user'];
  const isAdmin = roles.includes('admin');
  const subscription = await getUserSubscription(userId);

  return (
    <Badge variant={isAdmin ? 'destructive' : 'outline'}>
      <div className="flex gap-1">
        <span>{roles.join(', ')}</span>
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
  const roles = sessionClaims?.roles ?? ['user'];
  const isAdmin = roles.includes('admin');
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
