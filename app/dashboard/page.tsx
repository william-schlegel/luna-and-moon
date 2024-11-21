import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { IsAdmin, isArtist } from '@/components/role';
import { getUsers } from '@/server/db/users';

import Block from './block';

export default async function Page() {
  const { userId } = await auth();
  console.log('userId', userId);
  if (!userId) redirect('/');
  const hasArtistSubscription = await isArtist();
  console.log('hasArtistSubscription', hasArtistSubscription);
  if (!hasArtistSubscription) redirect('/');
  const artists = await getUsers();
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <IsAdmin>
          <Block libelle="artistes" list={artists} />
        </IsAdmin>
      </div>
    </div>
  );
}
