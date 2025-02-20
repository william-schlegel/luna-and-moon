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
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
          name: `${profile.given_name} ${profile.family_name}`
        };
      }
    },
    apple: {
      clientId: env.APPLE_CLIENT_ID,
      clientSecret: env.APPLE_CLIENT_SECRET,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.name.split(' ')[0],
          lastName: profile.name.split(' ')[1],
          name: profile.name
        };
      }
    },
    facebook: {
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.name.split(' ')[0],
          lastName: profile.name.split(' ')[1],
          name: profile.name
        };
      }
    }
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'user',
        input: false // don't allow user to set role
      },
      tier: {
        type: 'string',
        required: true,
        defaultValue: 'Free'
      }
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Modify the user object before it is created
          return {
            data: {
              ...user,
              firstName: user.name.split(' ')[0],
              lastName: user.name.split(' ')[1]
            }
          };
        }
      }
    }
  },
  plugins: [admin()]
});

export async function getSessionServer() {
  return await auth.api.getSession({
    headers: await headers()
  });
}

export async function getActualUser() {
  const session = await getSessionServer();
  if (!session) return null;
  const { id } = session.user;
  const user = await getUser(id);

  return user;
}

export async function getActualUserId() {
  const session = await getSessionServer();
  return session?.user?.id;
}
