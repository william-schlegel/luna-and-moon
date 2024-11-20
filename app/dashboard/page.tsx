import { IsAdmin } from '@/components/role';
import { getArtists } from '@/server/db/users';

export default async function Page() {
  const artists = await getArtists();
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

type BlockProps = {
  libelle: string;
  list: Awaited<ReturnType<typeof getArtists>>;
};

function Block({ libelle, list }: BlockProps) {
  return (
    <div className="rounded-lg bg-gray-100 p-4">
      <h2 className="text-lg font-semibold">{libelle}</h2>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
