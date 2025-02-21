'use server';

import { z } from 'zod';

import { signupSchema } from '@/form-schemas/auth';

import { updateUser } from '../db/users';

export async function updateUserAction(
  userId: string,
  unsafeData: z.infer<typeof signupSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { success, data } = signupSchema.safeParse(unsafeData);
  const errorMessage = 'There was an error updating the user';

  if (!success || userId == null) {
    return { error: true, message: errorMessage };
  }

  const isSuccess = await updateUser(data, userId);

  return {
    error: !isSuccess,
    message: isSuccess ? 'user details updated' : errorMessage
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
