'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { artSchema } from '@/form-schemas/art';
import {
  createArt as createArtDb, // deleteProduct as deleteProductDb,
  updateArt as updateArtDb // updateCountryDiscounts as updateCountryDiscountsDb,
  // updateProductCustomization as updateProductCustomizationDb,
} from '@/server/db/art';

import { canCreateArt } from '../permissions';

export async function createArtAction(
  unsafeData: z.infer<typeof artSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { userId } = await auth();
  const { success, data } = artSchema.safeParse(unsafeData);
  const canCreate = await canCreateArt(userId);

  if (!success || userId == null || !canCreate) {
    return { error: true, message: 'There was an error creating your art' };
  }

  const { id } = await createArtDb({ ...data, clerkUserId: userId });

  redirect(`/dashboard/art/${id}`);
}

export async function updateArtAction(
  id: string,
  unsafeData: z.infer<typeof artSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { userId } = await auth();
  const { success, data } = artSchema.safeParse(unsafeData);
  const errorMessage = 'There was an error updating your art';

  if (!success || userId == null) {
    return { error: true, message: errorMessage };
  }

  const isSuccess = await updateArtDb(data, { id, userId });

  return {
    error: !isSuccess,
    message: isSuccess ? 'art details updated' : errorMessage
  };
}

// export async function deleteArt(id: string) {
//   const { userId } = await auth()
//   const errorMessage = "There was an error deleting your product"

//   if (userId == null) {
//     return { error: true, message: errorMessage }
//   }

//   const isSuccess = await deleteProductDb({ id, userId })

//   return {
//     error: !isSuccess,
//     message: isSuccess ? "Successfully deleted your product" : errorMessage,
//   }
// }
