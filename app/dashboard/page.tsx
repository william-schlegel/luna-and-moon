import { IsAdmin } from '@/components/role';
import { getUsers } from '@/server/db/users';

import Block from './block';

export default async function Page() {
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
