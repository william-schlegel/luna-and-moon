'use client';

import { useUser } from '@clerk/nextjs';

import { Badge } from './ui/badge';

export const OrgMembersParams = {
  memberships: {
    pageSize: 5,
    keepPreviousData: true
  }
};

export default function Role() {
  const { roles, isAdmin } = useRole();
  return (
    <Badge variant={isAdmin ? 'destructive' : 'outline'}>
      {roles ?? '???'}
    </Badge>
  );
}

export function useRole(asArray?: boolean) {
  const { user } = useUser();

  const roles =
    user?.organizationMemberships?.map((membership) => {
      const r = membership.role.split(':');
      return r?.[1];
    }) ?? [];

  const isAdmin = roles.includes('admin');

  return {
    isAdmin,
    roles: asArray ? roles : roles.join(', ')
  };
}

export function IsAdmin({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useRole();
  return isAdmin ? <>{children}</> : null;
}
