// import { env } from "./env/server"

export type SubscriptionTier = {
  name: string;
  priceInCents: number;
  maxNumberOfArt: number;
  needAcknowledge: boolean;
  stripePriceId: string;
};
export const tierNames = [
  'Free',
  'ArtistFree',
  'Artist',
  'AdvancedArtist'
] as const;
export type TierNames = (typeof tierNames)[number];
export type PaidTierNames = Exclude<TierNames, 'Free' | 'ArtistFree'>;

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
} as const satisfies Record<TierNames, SubscriptionTier>;

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

export function getTierByName(name?: TierNames) {
  if (!name) return '';
  return subscriptionTiers[name].name;
}
