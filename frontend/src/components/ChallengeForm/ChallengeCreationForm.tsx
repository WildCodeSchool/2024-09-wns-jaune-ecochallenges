import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useCreateChallengeMutation } from '@/lib/graphql/generated/graphql-types';
import { Step1Init } from './Step1-Init';
import { useState } from 'react';
import { Step2Actions } from './Step2-Actions';

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

type FormType = z.infer<typeof formSchema>;

export const ChallengeCreationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [challengeId, setChallengeId] = useState<string | null>(null);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   label: '',
    //   description: '',
    //   bannerURL: '',
    //   dateRange: {
    //     from: undefined,
    //     to: undefined,
    //   },
    // },
  });

  const [createChallenge] = useCreateChallengeMutation();

  const onSubmitStep1 = async (data: FormType) => {
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
      setChallengeId(response.data?.createChallenge?.id || null);
      setCurrentStep(2);
    } catch (error) {
      console.error('Erreur lors de la création du challenge :', error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={
          currentStep === 1 ? form.handleSubmit(onSubmitStep1) : undefined
        }
        className="space-y-4"
      >
        {currentStep === 1 && <Step1Init />}
        {currentStep === 2 && challengeId && (
          <Step2Actions challengeId={challengeId} />
        )}

        {currentStep === 1 ? (
          <div className="flex justify-between">
            <Button type="submit">Créer le challenge</Button>
            <Button type="button" onClick={form.handleSubmit(onSubmitStep1)}>
              Ajouter des éco-gestes
            </Button>
          </div>
        ) : (
          <Button type="button" onClick={() => setCurrentStep(1)}>
            Retour
          </Button>
        )}
      </form>
    </Form>
  );
};
