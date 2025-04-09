import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateChallengeMutation } from '@/lib/graphql/generated/graphql-types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ChallengeCreationForm = () => {
  const formSchema = z
    .object({
      label: z
        .string()
        .min(1, {
          message:
            'Vous devez obligatoirement donner un nom à votre challenge pour le créer',
        })
        .max(100, {
          message:
            'Le nom de votre challenge ne doit pas dépasser 100 caractères',
        }),
      description: z.string().optional(),
      bannerURL: z.string().optional(),
      startDate: z.date({
        required_error: 'Votre challenge doit avoir une date de début',
      }),
      endDate: z.date({
        required_error: 'Votre challenge doit avoir une date de fin',
      }),
    })
    .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
      message: 'La date de fin doit être postérieure à la date de début',
      path: ['endDate'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [createChallenge] = useCreateChallengeMutation();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await createChallenge({
        variables: {
          data: {
            label: data.label,
            ...(data.description && { description: data.description }),
            ...(data.bannerURL && { bannerUrl: data.bannerURL }),
            startDate: data.startDate.toISOString(),
            endDate: data.endDate.toISOString(),
            actions: [],
          },
        },
      });
      console.log('Challenge créé avec succès :', response.data);
    } catch (error) {
      console.error('Erreur lors de la création du challenge :', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bannerURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bannière</FormLabel>
              <FormControl>
                <Input placeholder="Bannière" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de début</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), 'PPP', { locale: fr })
                      ) : (
                        <span>Choisissez une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={fr}
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de fin</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), 'PPP', { locale: fr })
                      ) : (
                        <span>Choisissez une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={fr}
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < form.getValues('startDate') || date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Créer le challenge</Button>
      </form>
    </Form>
  );
};
