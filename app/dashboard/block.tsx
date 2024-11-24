'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getArts } from '@/server/db/art';
import { getUsers } from '@/server/db/users';

type BlockProps = {
  libelle: string;
  list:
    | Awaited<ReturnType<typeof getUsers>>
    | Awaited<ReturnType<typeof getArts>>;
  urlPlus?: string;
};

export default function Block({
  libelle,
  list,
  urlPlus
}: Readonly<BlockProps>) {
  const { push } = useRouter();
  return (
    <div className="rounded-lg bg-gray-100 p-4">
      <h2 className="flex items-center justify-between">
        {libelle}
        {urlPlus ? (
          <Button variant="outline" onClick={() => push(urlPlus)}>
            <Plus />
          </Button>
        ) : null}
      </h2>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
