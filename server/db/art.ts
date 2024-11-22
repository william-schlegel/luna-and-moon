import { db } from '@/drizzle/db';
import { CACHE_TAGS, dbCache, getGlobalTag } from '@/lib/cache';

export function getArts(userId?: string) {
  const cacheFn = dbCache(() => getArtsInternal(userId), {
    tags: [getGlobalTag(CACHE_TAGS.arts)]
  });

  return cacheFn();
}

async function getArtsInternal(userId?: string) {
  const data = await db.query.art.findMany({
    where: userId ? ({ userId }, { eq }) => eq(userId, userId) : undefined,
    orderBy: ({ creationDate }, { desc }) => desc(creationDate)
  });
  return data.map((art) => ({
    id: art.id,
    name: art.name,
    creationDate: art.creationDate,
    image: art.imageId
  }));
}
