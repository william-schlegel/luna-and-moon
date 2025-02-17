import { z } from 'zod';

export const artSchema = z.object({
  artCategoryId: z.string().optional(),
  name: z.string().min(1, 'Required'),
  description: z.string().optional(),
  imageId: z.string().optional(),
  onSale: z.boolean().optional(),
  originalPrice: z
    .number()
    .min(0, 'le prix doit être supérieur ou égal à 0')
    .optional(),
  price: z
    .number()
    .min(0, 'le prix doit être supérieur ou égal à 0')
    .optional(),
  available: z.boolean().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  depth: z.number().optional(),
  materialId: z.string().optional(),
  material: z.string().optional(),
  weight: z.number().optional()
});

export type ArtSchemaType = z.infer<typeof artSchema>;
