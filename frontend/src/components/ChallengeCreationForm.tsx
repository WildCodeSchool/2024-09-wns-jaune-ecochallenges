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
      dateRange: z.object({
        from: z.date({
          required_error: 'Votre challenge doit avoir une date de début',
        }),
        to: z.date({
          required_error: 'Votre challenge doit avoir une date de fin',
        }),
      }),
    })
    .refine((data) => data.dateRange.to > data.dateRange.from, {
      message: 'La date de fin doit être postérieure à la date de début',
      path: ['dateRange.to'],
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
            startDate: data.dateRange.from.toISOString(),
            endDate: data.dateRange.to.toISOString(),
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
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Période du challenge</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[300px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, 'PPP', { locale: fr })} -{' '}
                            {format(field.value.to, 'PPP', { locale: fr })}
                          </>
                        ) : (
                          format(field.value.from, 'PPP', { locale: fr })
                        )
                      ) : (
                        <span>Sélectionnez une période</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    locale={fr}
                    disabled={(date) => date < new Date()}
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
