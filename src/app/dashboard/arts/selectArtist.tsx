'use client';

import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { getArtistsWithArts } from '@/server/db/users';

type SelectArtistProps = Readonly<{
  artists: Awaited<ReturnType<typeof getArtistsWithArts>>;
  artist?: string;
}>;

export default function SelectArtist({ artists, artist }: SelectArtistProps) {
  const router = useRouter();
  if (!Array.isArray(artists)) return null;
  return (
    <Select
      defaultValue={artist}
      onValueChange={(value) => {
        const url = new URL(window.location.href);
        url.searchParams.set('artist', value);
        url.searchParams.delete('page');
        router.push(url.pathname + url.search);
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filtrer par artiste" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">Tous les artistes</SelectItem>
        {artists.map((artist) => (
          <SelectItem key={artist.id} value={artist.id}>
            {artist.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
