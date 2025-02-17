import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { env } from '@/data/env/client';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_SERVER_URL, // the base url of your auth server
  plugins: [adminClient()]
});

export const { signIn, signUp, useSession, getSession } = authClient;
