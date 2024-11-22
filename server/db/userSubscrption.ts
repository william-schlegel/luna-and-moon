import { SQL } from 'drizzle-orm';

import { subscriptionTiers } from '@/data/subscriptionTiers';
import { db } from '@/drizzle/db';
import { NewUser, UserTable } from '@/drizzle/schema';
import {
  CACHE_TAGS,
  dbCache,
  getUserTag,
  revalidateDbCache
} from '@/lib/cache';

export async function createUserSubscription(data: NewUser) {
  const [newSubscription] = await db
    .insert(UserTable)
    .values(data)
    .onConflictDoNothing({
      target: UserTable.clerkId
    })
    .returning({
      id: UserTable.id,
      userId: UserTable.clerkId
    });

  if (newSubscription != null) {
    revalidateDbCache({
      tag: CACHE_TAGS.user,
      id: newSubscription.id,
      userId: newSubscription.userId
    });
  }

  return newSubscription;
}

export function getUserSubscription(userId: string) {
  const cacheFn = dbCache(getUserSubscriptionInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.user)]
  });

  return cacheFn(userId);
}

export async function updateUserSubscription(
  where: SQL,
  data: Partial<typeof UserTable.$inferInsert>
) {
  const [updatedSubscription] = await db
    .update(UserTable)
    .set(data)
    .where(where)
    .returning({
      id: UserTable.id,
      userId: UserTable.clerkId
    });

  if (updatedSubscription != null) {
    revalidateDbCache({
      tag: CACHE_TAGS.user,
      userId: updatedSubscription.userId,
      id: updatedSubscription.id
    });
  }
}

export async function getUserSubscriptionTier(userId: string) {
  const subscription = await getUserSubscription(userId);

  if (subscription == null) throw new Error('User has no subscription');

  return subscriptionTiers[subscription.tier];
}

async function getUserSubscriptionInternal(userId: string) {
  const data = await db.query.user.findFirst({
    where: ({ clerkId }, { eq }) => eq(clerkId, userId)
  });
  return data;
}
