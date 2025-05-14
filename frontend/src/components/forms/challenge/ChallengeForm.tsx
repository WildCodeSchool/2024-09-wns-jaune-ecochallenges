import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import {
  Step1Init,
  Step2Actions,
  Step3Members,
} from '@/components/forms/challenge';
import { GET_CHALLENGE, GET_CHALLENGES } from '@/lib/graphql/operations';
import {
  useCreateChallengeMutation,
  useGetChallengeQuery,
  useUpdateChallengeMutation,
  useDeleteChallengeMutation,
} from '@/lib/graphql/generated/graphql-types';
import { toast } from 'sonner';
import { Check, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
    members: z.array(z.string()),
  })
  .refine((data) => data.dateRange.to > data.dateRange.from, {
    message: 'La date de fin doit être postérieure à la date de début',
    path: ['dateRange.to'],
  });

type FormType = z.infer<typeof formSchema>;

export const ChallengeForm = ({ challengeId }: { challengeId?: string }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('step1');
  const [createChallenge] = useCreateChallengeMutation({
    refetchQueries: [
      {
        query: GET_CHALLENGES,
      },
    ],
    onCompleted: () => {
      navigate(`/challenge/${challengeId}`);
    },
  });
  const [updateChallenge] = useUpdateChallengeMutation({
    refetchQueries: [
      {
        query: GET_CHALLENGE,
        variables: { id: challengeId },
      },
    ],
    onCompleted: () => {
      navigate(`/challenge/${challengeId}`);
    },
  });
  const [deleteChallenge] = useDeleteChallengeMutation({
    refetchQueries: [
      {
        query: GET_CHALLENGES,
      },
    ],
    onCompleted: () => {
      navigate(`/challenges`);
    },
  });
  const { data, loading, error } = useGetChallengeQuery({
    skip: !challengeId,
    variables: { id: challengeId! },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    values: data?.getChallenge && {
      label: data.getChallenge.label,
      description: data.getChallenge.description || '',
      bannerURL: data.getChallenge.bannerUrl || '',
      dateRange: {
        from: new Date(data.getChallenge.startDate),
        to: new Date(data.getChallenge.endDate),
      },
      actions: data.getChallenge.actions.map((action) => action.id),
      members: data.getChallenge.members.map((member) => member.id),
    },
    defaultValues: {
      label: '',
      description: '',
      bannerURL: '',
      dateRange: {
        from: undefined,
        to: undefined,
      },
      actions: [],
      members: [],
    },
  });

  const onSubmit = async (formData: FormType) => {
    try {
      const challengeData = {
        label: formData.label,
        ...(formData.description && { description: formData.description }),
        ...(formData.bannerURL && { bannerUrl: formData.bannerURL }),
        startDate: formData.dateRange.from.toISOString(),
        endDate: formData.dateRange.to.toISOString(),
        actions: formData.actions,
        members: formData.members,
      };

      const response = await (challengeId
        ? updateChallenge({
            variables: {
              id: challengeId,
              data: challengeData,
            },
          })
        : createChallenge({
            variables: {
              data: challengeData,
            },
          }));

      if (response.errors) throw new Error(response.errors[0].message);
      toast.success(
        `Challenge ${challengeId ? 'modifié' : 'créé'} avec succès`
      );
    } catch (error) {
      toast.error(
        `Erreur lors de la ${challengeId ? 'modification' : 'création'} du challenge`
      );
    }
  };

  const onError = (errors: typeof form.formState.errors) => {
    const errorTab = getTabWithErrors(errors);
    if (!errorTab) return;
    setActiveTab(errorTab);
    toast.error('Veuillez corriger les erreurs avant de continuer');
  };

  const getTabWithErrors = (errors: typeof form.formState.errors) => {
    if (
      errors.label ||
      errors.description ||
      errors.bannerURL ||
      errors.dateRange
    ) {
      return 'step1';
    }
    if (errors.actions) return 'step2';
    return null;
  };

  const handleDeleteChallenge = async () => {
    try {
      const response = await deleteChallenge({
        variables: {
          id: challengeId!,
        },
      });
      if (response.errors) throw new Error(response.errors[0].message);
      toast.success('Challenge supprimé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression du challenge');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue : {error.message}</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="relative"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="step1">Infos</TabsTrigger>
            <TabsTrigger value="step2">Éco-gestes</TabsTrigger>
            <TabsTrigger value="step3">Participants</TabsTrigger>
          </TabsList>

          <TabsContent value="step1" className="space-y-4">
            <Step1Init />
          </TabsContent>
          <TabsContent value="step2" className="">
            <Step2Actions />
          </TabsContent>
          <TabsContent value="step3">
            <Step3Members />
          </TabsContent>
        </Tabs>

        <div className="fixed right-4 bottom-20 z-50 flex flex-col gap-4">
          {challengeId && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="size-14 rounded-full shadow-md shadow-black/50"
                >
                  <Trash className="size-10" strokeWidth={1.4} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Supprimer le challenge</DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir supprimer ce challenge ? Cette
                    action est irréversible.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="button" onClick={handleDeleteChallenge}>
                    Confirmer
                  </Button>
                  <DialogClose asChild>
                    <Button>Annuler</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          <Button
            type="submit"
            variant="default"
            className="size-14 rounded-full shadow-md shadow-black/50"
          >
            <Check className="size-10" strokeWidth={1.4} />
          </Button>
        </div>
      </form>
    </Form>
  );
};
