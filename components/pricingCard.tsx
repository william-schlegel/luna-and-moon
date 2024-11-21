import { SignUpButton } from '@clerk/nextjs';
import { CheckIcon } from 'lucide-react';

import { subscriptionTiersInOrder } from '@/data/subscriptionTiers';
import { cn, formatCompactNumber, formatMoneytNumber } from '@/lib/utils';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card';

export default function PricingCard({
  name,
  priceInCents,
  maxNumberOfArt
}: (typeof subscriptionTiersInOrder)[number]) {
  const isMostPopular = name === 'Artiste';

  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-3xl shadow-none',
        isMostPopular ? 'border-2 border-accent' : 'border-none'
      )}
    >
      {isMostPopular && (
        <div className="absolute -right-8 top-24 origin-top-right rotate-45 bg-accent px-10 py-1 text-accent-foreground">
          Plus populaire
        </div>
      )}
      <CardHeader>
        <div className="mb-8 font-semibold text-accent">{name}</div>
        <CardTitle className="text-xl font-bold">
          {formatMoneytNumber(priceInCents / 100)} /mo
        </CardTitle>
        <CardDescription>
          {formatCompactNumber(maxNumberOfArt)} oeuvres visibles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpButton>
          <Button
            className="w-full rounded-lg text-lg"
            variant={isMostPopular ? 'destructive' : 'default'}
          >
            Démarrer
          </Button>
        </SignUpButton>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Feature className="font-bold">
          {maxNumberOfArt}
          {' oeuvres visibles'}
        </Feature>
      </CardFooter>
    </Card>
  );
}

function Feature({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <CheckIcon className="size-4 rounded-full bg-accent/25 stroke-accent p-0.5" />
      <span>{children}</span>
    </div>
  );
}
