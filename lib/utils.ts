import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const compactNumberFormatter = new Intl.NumberFormat(undefined, {
  notation: 'compact'
});

export function formatCompactNumber(number: number) {
  return compactNumberFormatter.format(number);
}

const moneytNumberFormatter = new Intl.NumberFormat('fr-fr', {
  notation: 'standard',
  style: 'currency',
  currency: 'EUR'
});

export function formatMoneytNumber(number: number) {
  return moneytNumberFormatter.format(number);
}
