import { auth } from '@clerk/nextjs/server';
import { AwaitedReactNode } from 'react';

import { NoPermissionCard } from './noPermissionCard';

type HasPermissionProps = {
  permission: (userId: string | null) => Promise<boolean>;
  renderFallback?: boolean;
  fallbackText?: string;
  children: AwaitedReactNode;
};

export async function HasPermission({
  permission,
  renderFallback = false,
  fallbackText,
  children
}: Readonly<HasPermissionProps>) {
  const { userId } = await auth();
  const hasPermission = await permission(userId);
  if (hasPermission) return children;
  if (renderFallback)
    return <NoPermissionCard>{fallbackText}</NoPermissionCard>;
  return null;
}
