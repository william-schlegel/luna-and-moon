'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SigninSchemaType, signinSchema } from '@/form-schemas/auth';
import { signIn } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

export function LoginForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<'div'>>) {
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: SigninSchemaType) => {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: '/'
      },
      {
        onRequest: () => {
          setIsSubmitting(true);
          setSubmitError(null);
        },
        onSuccess: (ctx) => {
          console.log('onSuccess ctx :>> ', ctx);
          setIsSubmitting(false);
        },
        onError: (ctx) => {
          // display the error message
          setSubmitError(ctx.error.message);
          setIsSubmitting(false);
        }
      }
    );
  };

  console.log('form.formState.errors :>> ', form.formState.errors);

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full">
                    <Image
                      src="/svg/facebook.svg"
                      alt="Apple"
                      width={16}
                      height={16}
                    />
                    {'Se connecter avec Facebook'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Image
                      src="/svg/apple.svg"
                      alt="Apple"
                      width={16}
                      height={16}
                    />
                    {'Se connecter avec Apple'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Image
                      src="/svg/google.svg"
                      alt="Google"
                      width={16}
                      height={16}
                    />
                    {'Se connecter avec Google'}
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    {'Ou continuer avec'}
                  </span>
                </div>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="votre@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="motde passe"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
                  </Button>
                  {submitError ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>{submitError}</AlertDescription>
                    </Alert>
                  ) : null}
                </div>
                <div className="text-center text-sm">
                  {"Vous n'avez pas de compte ? "}
                  <Link
                    href="/sign-up"
                    className="underline underline-offset-4"
                  >
                    {'Créer un compte'}
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        {'en cous connectant, vous agréez à nos '}
        <Link href="terms-of-service">{"Conditions d'utilisation"}</Link>{' '}
        {' et '}
        <Link href="/private-policy">{'Gestion des données personnelles'}</Link>
        .
      </div>
    </div>
  );
}
