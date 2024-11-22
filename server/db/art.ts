import { and, count, eq } from 'drizzle-orm';

import { db } from '@/drizzle/db';
import { ArtTable, NewArt } from '@/drizzle/schema';
import {
  CACHE_TAGS,
  dbCache,
  getGlobalTag,
  getUserTag,
  revalidateDbCache
} from '@/lib/cache';

export function getArts(userId?: string) {
  const cacheFn = dbCache(() => getArtsInternal(userId), {
    tags: [getGlobalTag(CACHE_TAGS.arts)]
  });

  return cacheFn();
}

async function getArtsInternal(userId?: string) {
  const data = await db.query.ArtTable.findMany({
    where: userId
      ? ({ clerkUserId }, { eq }) => eq(clerkUserId, userId)
      : undefined,
    orderBy: ({ creationDate }, { desc }) => desc(creationDate)
  });
  return data.map((art) => ({
    id: art.id,
    name: art.name,
    creationDate: art.creationDate,
    image: art.imageId
  }));
}

export async function createArt(data: NewArt) {
  const [newArt] = await db
    .insert(ArtTable)
    .values(data)
    .returning({ id: ArtTable.id, userId: ArtTable.clerkUserId });

  revalidateDbCache({
    tag: CACHE_TAGS.arts,
    userId: newArt.userId,
    id: newArt.id
  });

  return newArt;
}

export async function updateArt(
  data: Partial<NewArt>,
  { id, userId }: { id: string; userId: string }
) {
  const { rowCount } = await db
    .update(ArtTable)
    .set(data)
    .where(and(eq(ArtTable.clerkUserId, userId), eq(ArtTable.id, id)));

  if (rowCount > 0) {
    revalidateDbCache({
      tag: CACHE_TAGS.arts,
      userId,
      id
    });
  }

  return rowCount > 0;
}

// export async function deleteProduct({
//   id,
//   userId,
// }: {
//   id: string
//   userId: string
// }) {
//   const { rowCount } = await db
//     .delete(ProductTable)
//     .where(and(eq(ProductTable.id, id), eq(ProductTable.clerkUserId, userId)))

//   if (rowCount > 0) {
//     revalidateDbCache({
//       tag: CACHE_TAGS.products,
//       userId,
//       id,
//     })
//   }

//   return rowCount > 0
// }

export function getArtCount(userId: string) {
  const cacheFn = dbCache(getArtCountInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.arts)]
  });

  return cacheFn(userId);
}

async function getArtCountInternal(userId: string) {
  const counts = await db
    .select({ artCount: count() })
    .from(ArtTable)
    .where(eq(ArtTable.clerkUserId, userId));

  return counts[0]?.artCount ?? 0;
}
