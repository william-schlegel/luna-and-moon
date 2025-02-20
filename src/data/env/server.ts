import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    DATABASE_URL: z.string().url(),
    UPLOADTHING_TOKEN: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    APPLE_CLIENT_ID: z.string(),
    APPLE_CLIENT_SECRET: z.string(),
    FACEBOOK_CLIENT_ID: z.string(),
    FACEBOOK_CLIENT_SECRET: z.string(),
    // STRIPE_SECRET_KEY: z.string(),
    // STRIPE_WEBHOOK_SECRET: z.string(),
    // STRIPE_BASIC_PLAN_STRIPE_PRICE_ID: z.string(),
    // STRIPE_STANDARD_PLAN_STRIPE_PRICE_ID: z.string(),
    // STRIPE_PREMIUM_PLAN_STRIPE_PRICE_ID: z.string()
    NO_CACHE: z.string()
  },
  experimental__runtimeEnv: process.env
});
