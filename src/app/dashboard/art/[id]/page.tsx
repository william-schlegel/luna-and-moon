import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getArtById } from '@/server/db/art';

type ArtDetailsPageProps = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

export default async function ArtDetailsPage({ params }: ArtDetailsPageProps) {
  const { id } = await params;
  console.log('ArtDetailsPage id :>> ', id);
  const art = await getArtById(id);
  console.log('ArtDetailsPage art :>> ', art);
  if (!art) {
    notFound();
  }

  return (
    <main className="container mx-auto space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Link>
        </Button>
      </div>

      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{art.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {art.imageUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={art.imageUrl}
                alt={art.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {art.description ?? 'Aucune description disponible'}
            </p>
          </div>

          {art.available && (
            <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
              Disponible à la vente
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
