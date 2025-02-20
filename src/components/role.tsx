import { getTierByName } from '@/data/subscriptionTiers';
import { getActualUser, getActualUserId } from '@/lib/auth';
import { getUserSubscription } from '@/server/db/userSubscrption';

import { Badge } from './ui/badge';

export const OrgMembersParams = {
  memberships: {
    pageSize: 5,
    keepPreviousData: true
  }
};

export default async function Role() {
  const user = await getActualUser();
  if (!user) return null;
  const userId = user.id;

  const role = user.role ?? 'user';
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
  const userId = await getActualUserId();
  return userId ? null : <>{children}</>;
}

export async function IsConnected({ children }: { children: React.ReactNode }) {
  const userId = await getActualUserId();
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
  const user = await getActualUser();
  const role = user?.role ?? 'user';
  const isAdmin = role === 'admin';
  return isAdmin;
}

export async function isArtist() {
  const user = await getActualUser();
  if (!user) return false;
  const subscriptionTier = user.tier;
  const isArtist =
    subscriptionTier === 'Artist' ||
    subscriptionTier === 'AdvancedArtist' ||
    subscriptionTier === 'ArtistFree';

  return isArtist;
}
