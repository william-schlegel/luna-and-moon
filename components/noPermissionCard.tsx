import Link from 'next/link';
import { ReactNode } from 'react';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card';

export function NoPermissionCard({
  children = "Vous n'avez pas les droits nécessaires pour accéder à cette page. Augmentez vote compte pour y accéder."
}: {
  children?: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Permission refusée</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{children}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href="/dashboard/change-subscription">
            Augmenter mon compte
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
