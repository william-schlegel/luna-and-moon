import { type FileRouter, createUploadthing } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

import { auth } from '@/lib/auth';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '16MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const session = await auth.api.getSession({
        headers: req.headers // you need to pass the headers object.
      });

      // If you throw, the user will not be able to upload
      if (!session) throw new UploadThingError('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
  publicImageUploader: f({ image: { maxFileSize: '4MB' } }).onUploadComplete(
    async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log('file url', file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { url: file.ufsUrl };
    }
  )
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
