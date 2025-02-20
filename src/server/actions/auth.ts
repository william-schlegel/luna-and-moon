'use server';

import { SignupSchemaType } from '@/form-schemas/auth';
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

export const signUp = async (data: SignupSchemaType) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.firstName + ' ' + data.lastName,
        tier: data.plan
      }
    });
    return result;
  } catch (error) {
    console.error('error :>> ', error);
    throw new Error("Erreur lors de l'inscription");
  }
};
