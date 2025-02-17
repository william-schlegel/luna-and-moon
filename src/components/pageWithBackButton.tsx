import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

type PageWithBackButtonProps = Readonly<{
  backButtonHref: string;
  pageTitle: string;
  children: ReactNode;
}>;

export function PageWithBackButton({
  backButtonHref,
  pageTitle,
  children
}: PageWithBackButtonProps) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-8">
      <Button size="icon" variant="outline" className="rounded-full" asChild>
        <Link href={backButtonHref}>
          <div className="sr-only">Back</div>
          <ArrowLeft className="size-8" />
        </Link>
      </Button>
      <h1 className="self-center text-2xl font-semibold">{pageTitle}</h1>
      <div className="col-start-2">{children}</div>
    </div>
  );
}
