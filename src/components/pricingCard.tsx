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

type PricingCardProps = (typeof subscriptionTiersInOrder)[number] & {
  selected?: boolean;
  onClick?: () => void;
};

export default function PricingCard({
  name,
  priceInCents,
  maxNumberOfArt,
  selected,
  onClick
}: PricingCardProps) {
  const isMostPopular = name === 'Artiste';

  return (
    <button type="button" className="cursor-pointer" onClick={onClick}>
      <Card
        className={cn(
          'relative overflow-hidden rounded-3xl shadow-none',
          isMostPopular ? 'border-accent border-2' : 'border-primary border',
          selected && 'bg-accent/10 border-4'
        )}
      >
        {isMostPopular && (
          <div className="bg-accent text-accent-foreground absolute top-24 -right-8 origin-top-right rotate-45 px-10 py-1">
            Plus populaire
          </div>
        )}
        <CardHeader>
          <div className="text-accent mb-8 font-semibold">{name}</div>
          <CardTitle className="text-xl font-bold">
            {formatMoneytNumber(priceInCents / 100)} /mo
          </CardTitle>
          <CardDescription>
            {formatCompactNumber(maxNumberOfArt)} oeuvres visibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            asChild
            type="button"
            className="w-full rounded-lg text-lg"
            variant={isMostPopular ? 'destructive' : 'default'}
          >
            <span>Sélectionner</span>
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Feature className="font-bold">
            {maxNumberOfArt}
            {' oeuvres visibles'}
          </Feature>
        </CardFooter>
      </Card>
    </button>
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
      <CheckIcon className="bg-accent/25 stroke-accent size-4 rounded-full p-0.5" />
      <span>{children}</span>
    </div>
  );
}
