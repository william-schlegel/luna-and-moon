import { z } from 'zod';

import { tierNames } from '@/data/subscriptionTiers';

export const signupSchema = z.object({
  email: z.string().email('Email invalide'),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  plan: z.enum(tierNames)
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
