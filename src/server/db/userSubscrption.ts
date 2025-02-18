import { SQL } from 'drizzle-orm';

import { subscriptionTiers } from '@/data/subscriptionTiers';
import {
  CACHE_TAGS,
  dbCache,
  getUserTag,
  revalidateDbCache
} from '@/lib/cache';

import { db } from '../../../db/db';
import { NewUser, user } from '../../../db/schema';

export async function createUserSubscription(data: NewUser) {
  const [newSubscription] = await db
    .insert(user)
    .values(data)
    .onConflictDoNothing({
      target: user.id
    })
    .returning({
      id: user.id,
      userId: user.id
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
  data: Partial<typeof user.$inferInsert>
) {
  const [updatedSubscription] = await db
    .update(user)
    .set(data)
    .where(where)
    .returning({
      id: user.id,
      userId: user.id
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
    where: ({ id }, { eq }) => eq(id, userId)
  });
  return data;
}
