// import { env } from "./env/server"

export type TierNames = keyof typeof subscriptionTiers;
export type PaidTierNames = Exclude<TierNames, 'Free'>;

export const subscriptionTiers = {
  Free: {
    name: 'Visiteur',
    priceInCents: 0,
    maxNumberOfArt: 0,
    needAcknowledge: false,
    stripePriceId: '' // env.STRIPE_FREE_PLAN_STRIPE_PRICE_ID,
  },
  ArtistFree: {
    name: 'Artiste découverte',
    priceInCents: 0,
    maxNumberOfArt: 5,
    needAcknowledge: true,
    stripePriceId: '' // env.STRIPE_FREE_PLAN_STRIPE_PRICE_ID,
  },
  Artist: {
    name: 'Artiste',
    priceInCents: 500,
    maxNumberOfArt: 50,
    needAcknowledge: false,
    stripePriceId: '' // env.STRIPE_FREE_PLAN_STRIPE_PRICE_ID,
  },
  AdvancedArtist: {
    name: 'Artiste confirmé',
    priceInCents: 2500,
    maxNumberOfArt: 1000,
    needAcknowledge: false,
    stripePriceId: '' // env.STRIPE_FREE_PLAN_STRIPE_PRICE_ID,
  }
} as const;

export const subscriptionTiersInOrder = [
  subscriptionTiers.Free,
  subscriptionTiers.ArtistFree,
  subscriptionTiers.Artist,
  subscriptionTiers.AdvancedArtist
] as const;

export function getTierByPriceId(stripePriceId: string) {
  return Object.values(subscriptionTiers).find(
    (tier) => tier.stripePriceId === stripePriceId
  );
}
