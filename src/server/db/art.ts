import { and, count, eq } from 'drizzle-orm';

import {
  CACHE_TAGS,
  dbCache,
  getGlobalTag,
  getIdTag,
  getUserTag,
  revalidateDbCache
} from '@/lib/cache';

import { db } from '../../../db/db';
import { ArtTable, NewArt } from '../../../db/schema';

export function getArts(userId?: string) {
  const cacheFn = dbCache(() => getArtsInternal(userId), {
    tags: [getGlobalTag(CACHE_TAGS.arts)]
  });

  return cacheFn();
}

async function getArtsInternal(userId?: string) {
  const data = await db.query.ArtTable.findMany({
    where: userId ? ({ userId }, { eq }) => eq(userId, userId) : undefined,
    orderBy: ({ createdAt }, { desc }) => desc(createdAt)
  });
  return data.map((art) => ({
    id: art.id,
    name: art.name,
    createdAt: art.createdAt,
    image: art.imageId
  }));
}
// Ajouter après les imports existants

export function getArtById(id: string) {
  const cacheFn = dbCache(() => getArtByIdInternal(id), {
    tags: [getIdTag(id, CACHE_TAGS.arts)]
  });

  return cacheFn();
}

async function getArtByIdInternal(id: string) {
  const art = await db.query.ArtTable.findFirst({
    where: ({ id: artId }, { eq }) => eq(artId, id)
  });

  if (!art) {
    return null;
  }

  return {
    id: art.id,
    name: art.name,
    description: art.description,
    imageUrl: art.imageId, // Assurez-vous d'adapter selon votre schéma
    available: art.available,
    createdAt: art.createdAt,
    userId: art.userId
  };
}

export async function createArt(data: NewArt) {
  const [newArt] = await db
    .insert(ArtTable)
    .values(data)
    .returning({ id: ArtTable.id, userId: ArtTable.userId });

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
    .where(and(eq(ArtTable.userId, userId), eq(ArtTable.id, id)));

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
//     .where(and(eq(ProductTable.id, id), eq(ProductTable.userId, userId)))

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
    .where(eq(ArtTable.userId, userId));

  return counts[0]?.artCount ?? 0;
}
