'use server';

import { TierNames } from '@/data/subscriptionTiers';
import { auth } from '@/lib/auth';

export const signIn = async (email: string, password: string) => {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password
    }
  });
  return result;
};

export const signUp = async (
  email: string,
  password: string,
  name: string,
  tier: TierNames
) => {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
      tier
    }
  });
  return result;
};
