import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { MyPagination } from '@/components/myPagination';
import { isAdmin } from '@/components/role';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { getArts } from '@/server/db/art';
import { getArtistsWithArts } from '@/server/db/users';

import SelectArtist from './selectArtist';

type ArtsPageProps = Readonly<{
  searchParams: Promise<{
    page?: string;
    artist?: string;
  }>;
}>;

const ITEMS_PER_PAGE = 12;

export default async function ArtsPage({ searchParams }: ArtsPageProps) {
  const userIsAdmin = await isAdmin();
  const { artist, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [arts, artists] = await Promise.all([
    getArts(artist === 'ALL' ? undefined : artist),
    userIsAdmin ? getArtistsWithArts() : null
  ]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedArts = arts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(arts.length / ITEMS_PER_PAGE);

  return (
    <main className="container mx-auto space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{"Galerie d'œuvres"}</h1>
        {userIsAdmin && (
          <SelectArtist artists={artists} artist={artist ?? 'ALL'} />
        )}
      </div>

      <Suspense fallback={<div>Chargement...</div>}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedArts.map((art) => (
            <Link key={art.id} href={`/dashboard/art/${art.id}`}>
              <Card className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{art.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square w-full overflow-hidden rounded-md">
                    <Image
                      src={art.image ?? '/public/file.svg'}
                      alt={art.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  {art.createdAt && (
                    <p className="text-muted-foreground text-sm">
                      {new Date(art.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </Suspense>

      {totalPages > 1 && (
        <MyPagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={`/dashboard/arts${artist ? `?artist=${artist}&` : '?'}`}
        />
      )}
    </main>
  );
}
