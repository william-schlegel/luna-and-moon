'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getUsers } from '@/server/db/users';

type BlockProps = {
  libelle: string;
  list: Awaited<ReturnType<typeof getUsers>>;
};

export default function Block({ libelle, list }: BlockProps) {
  return (
    <div className="rounded-lg bg-gray-100 p-4">
      <h2 className="flex items-center justify-between">
        {libelle}
        <Button variant="outline">
          <Plus />
        </Button>
      </h2>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
