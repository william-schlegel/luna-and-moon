import { getArtCount } from './db/art';
import { getUserSubscriptionTier } from './db/userSubscrption';

export async function canCreateArt(userId: string | null) {
  if (userId == null) return false;
  const tier = await getUserSubscriptionTier(userId);
  const productCount = await getArtCount(userId);
  return productCount < tier.maxNumberOfArt;
}
