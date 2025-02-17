/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function LoginForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<'div'>>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{'Bon retour chez moi!'}</CardTitle>
          <CardDescription>
            {'Se connecter avec un compte Facebook ou Google'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <img
                    src="/svg/facebook.svg"
                    alt="Apple"
                    className="h-4 w-4"
                  />
                  {'Se connecter avec Facebook'}
                </Button>
                <Button variant="outline" className="w-full">
                  <img src="/svg/google.svg" alt="Apple" className="h-4 w-4" />

                  {'Se connecter avec Google'}
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  {'Ou continuer avec'}
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">{'Email'}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">{'Mot de passe'}</Label>
                    <Link
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      {'Mot de passe oublié?'}
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  {'Se connecter'}
                </Button>
              </div>
              <div className="text-center text-sm">
                {"Vous n'avez pas de compte ? "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  {'Créer un compte'}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        {'en cous connectant, vous agréez à nos '}
        <Link href="terms-of-service">{"Conditions d'utilisation"}</Link>{' '}
        {' et '}
        <Link href="/private-policy">{'Gestion des données personnelles'}</Link>
        .
      </div>
    </div>
  );
}
