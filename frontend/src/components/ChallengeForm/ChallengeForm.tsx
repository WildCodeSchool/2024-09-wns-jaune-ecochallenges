import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useCreateChallengeMutation,
  useGetActionsQuery,
} from '@/lib/graphql/generated/graphql-types';
import { Step1Init, Step2Actions } from '@/components/ChallengeForm';
import { Check } from 'lucide-react';

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
    actions: z.array(z.string()),
  })
  .refine((data) => data.dateRange.to > data.dateRange.from, {
    message: 'La date de fin doit être postérieure à la date de début',
    path: ['dateRange.to'],
  });

type FormType = z.infer<typeof formSchema>;

export const ChallengeForm = () => {
  const [createChallenge] = useCreateChallengeMutation();
  const actionsQuery = useGetActionsQuery();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: '',
      description: '',
      bannerURL: '',
      dateRange: {
        from: undefined,
        to: undefined,
      },
      actions: [],
    },
  });

  const onSubmit = async (data: FormType) => {
    try {
      console.log('Données soumises:', data);
      const response = await createChallenge({
        variables: {
          data: {
            label: data.label,
            ...(data.description && { description: data.description }),
            ...(data.bannerURL && { bannerUrl: data.bannerURL }),
            startDate: data.dateRange.from.toISOString(),
            endDate: data.dateRange.to.toISOString(),
            actions: data.actions,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <Tabs defaultValue="step1">
          <TabsList className="w-full">
            <TabsTrigger value="step1">Infos</TabsTrigger>
            <TabsTrigger value="step2">Éco-gestes</TabsTrigger>
            <TabsTrigger value="step3">Participants</TabsTrigger>
          </TabsList>

          <TabsContent value="step1" className="space-y-4">
            <Step1Init />
          </TabsContent>
          <TabsContent value="step2" className="">
            <Step2Actions actionsQuery={actionsQuery} />
          </TabsContent>
          <TabsContent value="step3">
            <p>Coming soon...</p>
          </TabsContent>
        </Tabs>

        <Button
          type="submit"
          variant="default"
          className="fixed right-4 bottom-20 z-50 size-14 rounded-full shadow-md shadow-black/50"
        >
          <Check className="size-10" strokeWidth={1.4} />
        </Button>
      </form>
    </Form>
  );
};
