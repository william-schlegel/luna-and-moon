import { defineConfig } from 'drizzle-kit';

import { env } from '@/env/server';

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL
  }
});
