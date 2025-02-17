import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { headers } from 'next/headers';

import { env } from '@/data/env/server';
import { getUser } from '@/server/db/users';

import { db } from '../../db/db';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg'
  }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }
  },
  plugins: [admin()]
});

export async function getActualUser() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) return null;
  const { id } = session.user;
  const user = await getUser(id);

  return user;
}

export async function getActualUserId() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return session?.user?.id;
}
