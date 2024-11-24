import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { IsAdmin, isAdmin, isArtist } from '@/components/role';
import { getArts } from '@/server/db/art';
import { getUsers } from '@/server/db/users';

import Block from './block';

export default async function Page() {
  const { userId } = await auth();
  if (!userId) redirect('/');
  const hasArtistSubscription = await isArtist();
  if (!hasArtistSubscription) redirect('/');
  const artists = await getUsers(['Artist', 'ArtistFree', 'AdvancedArtist']);
  const admin = await isAdmin();
  const arts = await getArts(admin ? undefined : userId);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <IsAdmin>
          <Block libelle="artistes" list={artists} />
        </IsAdmin>
        <Block libelle="oeuvres" list={arts} urlPlus="/dashboard/art/new" />
      </div>
    </div>
  );
}
