import { defineConfig } from 'drizzle-kit';

import { env } from '@/data/env/server';

export default defineConfig({
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL
  }
});
