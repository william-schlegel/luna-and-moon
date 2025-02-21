'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import PricingCard from '@/components/pricingCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { subscriptionTiersInOrder } from '@/data/subscriptionTiers';
import { SignupSchemaType, signupSchema } from '@/form-schemas/auth';
import { UploadButton } from '@/lib/uploadthings';
import { signUp } from '@/server/actions/auth';
import { updateUserAction } from '@/server/actions/user';

type SignUpFormProps = Readonly<{
  userId?: string;
  profile?: SignupSchemaType;
}>;

export default function SignUpForm({ profile, userId }: SignUpFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: profile?.email ?? '',
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      plan: profile?.plan ?? 'Free',
      password: '',
      image: profile?.image ?? ''
    }
  });

  const onSubmit = async (data: SignupSchemaType) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      if (profile && userId) {
        const success = await updateUserAction(userId, data);
        if (!success) setSubmitError('Impossible de mettre à jour le profil');
      } else await signUp(data);
    } catch (error) {
      console.error('error :>> ', error);
      setSubmitError(error as string);
    }
    setIsSubmitting(false);
  };

  const plan = form.watch('plan');
  const image = form.watch('image');

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={image ?? ''} />
                  <AvatarFallback>Photo</AvatarFallback>
                </Avatar>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    form.setValue('image', res[0].ufsUrl);
                    setImageError(null);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    setImageError(error.message);
                  }}
                />
                {imageError ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>{imageError}</AlertDescription>
                  </Alert>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre prénom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              {!userId && (
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
              )}
            </div>

            <div className="space-y-4">
              <FormLabel>Choisissez votre plan</FormLabel>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {subscriptionTiersInOrder.map((tier) => (
                  <PricingCard
                    key={tier.id}
                    onClick={() => form.setValue('plan', tier.id)}
                    {...tier}
                    selected={plan === tier.id}
                  />
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />}
              {userId ? 'Mettre à jour' : "S'inscrire"}
            </Button>
            {submitError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            ) : null}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
