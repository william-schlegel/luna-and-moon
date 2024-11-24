'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@radix-ui/react-checkbox';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { RequiredLabelIcon } from '@/components/requiredLabelIcon';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createArtAction, updateArtAction } from '@/server/actions/art';

import { ArtSchemaType, artSchema } from '../../../form-schemas/art';

type ArtDetailsFormProps = {
  art?: {
    id: string;
    name: string;
    description: string | null;
    available: boolean;
  };
};

export const ArtDetailsForm: FC<ArtDetailsFormProps> = ({ art }) => {
  const { toast } = useToast();
  const form = useForm<ArtSchemaType>({
    resolver: zodResolver(artSchema),
    defaultValues: art
      ? { ...art, description: art.description ?? '' }
      : {
          name: '',
          description: ''
        }
  });

  async function onSubmit(values: ArtSchemaType) {
    const action =
      art == null ? createArtAction : updateArtAction.bind(null, art.id);
    const data = await action(values);

    if (data?.message) {
      toast({
        title: data.error ? 'Error' : 'Success',
        description: data.message,
        variant: data.error ? 'destructive' : 'default'
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        <div>image</div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Product Name
                  <RequiredLabelIcon />
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  A vendre
                  <RequiredLabelIcon />
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>Cette oeuvre est à vendre</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea className="min-h-20 resize-none" {...field} />
                </FormControl>
                <FormDescription>
                  An optional description to help distinguish your product from
                  other products
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="self-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
