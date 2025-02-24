import { z } from 'zod';

import { tierNames } from '@/data/subscriptionTiers';

export const signupSchema = z.object({
  email: z.string().email('Email invalide'),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .optional(),
  plan: z.enum(tierNames),
  image: z.string().url().optional()
});

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
});

export type SigninSchemaType = z.infer<typeof signinSchema>;
