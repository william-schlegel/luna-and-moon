import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const compactNumberFormatter = new Intl.NumberFormat('fr-fr', {
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

const decimaltNumberFormatter = new Intl.NumberFormat('fr-fr', {
  notation: 'standard',
  style: 'decimal',
  maximumFractionDigits: 2
});

export function formatDecimalNumber(number: number) {
  return decimaltNumberFormatter.format(number);
}

export function removeTrailingSlash(path: string) {
  return path.replace(/\/$/, '');
}
