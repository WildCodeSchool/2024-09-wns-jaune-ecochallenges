import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Check, Trash } from 'lucide-react';
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
import { challengeSchema, ChallengeFormValues } from '@/schemas';
import {
  useCreateChallengeMutation,
  useGetChallengeQuery,
  useUpdateChallengeMutation,
  useDeleteChallengeMutation,
} from '@/lib/graphql/generated/graphql-types';

const CHALLENGE_FORM_STEPS = {
  init: 'step1-init',
  actions: 'step2-actions',
  members: 'step3-members',
} as const;

type TCHALLENGE_FORM_STEPS =
  (typeof CHALLENGE_FORM_STEPS)[keyof typeof CHALLENGE_FORM_STEPS];

export const ChallengeForm = ({ challengeId }: { challengeId?: string }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TCHALLENGE_FORM_STEPS>(
    CHALLENGE_FORM_STEPS.init
  );
  const [createChallenge] = useCreateChallengeMutation({
    refetchQueries: [
      {
        query: GET_CHALLENGES,
      },
    ],
    onCompleted: (data) => {
      toast.success('Challenge créé avec succès');
      navigate(`/challenge/${data.createChallenge.id}`);
    },
    onError: () => {
      toast.error('Erreur lors de la création du challenge');
    },
  });
  const [updateChallenge] = useUpdateChallengeMutation({
    refetchQueries: [
      {
        query: GET_CHALLENGE,
        variables: { id: challengeId },
      },
    ],
    onCompleted: (data) => {
      toast.success('Challenge modifié avec succès');
      navigate(`/challenge/${data.updateChallenge.id}`);
    },
    onError: () => {
      toast.error('Erreur lors de la modification du challenge');
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

  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeSchema),
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

  const onSubmit = async (formData: ChallengeFormValues) => {
    const challengeData = {
      label: formData.label,
      ...(formData.description && { description: formData.description }),
      ...(formData.bannerURL && { bannerUrl: formData.bannerURL }),
      startDate: formData.dateRange.from.toISOString(),
      endDate: formData.dateRange.to.toISOString(),
      actions: formData.actions,
      members: formData.members,
    };

    challengeId
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
        });
  };

  const onError = (errors: typeof form.formState.errors) => {
    const errorTab = getTabWithErrors(errors);
    if (!errorTab) return;
    setActiveTab(errorTab);
    toast.error('Veuillez corriger les erreurs avant de continuer');
  };

  const getTabWithErrors = (
    errors: typeof form.formState.errors
  ): TCHALLENGE_FORM_STEPS | null => {
    if (
      errors.label ||
      errors.description ||
      errors.bannerURL ||
      errors.dateRange
    ) {
      return CHALLENGE_FORM_STEPS.init;
    }
    if (errors.actions) return CHALLENGE_FORM_STEPS.actions;
    if (errors.members) return CHALLENGE_FORM_STEPS.members;
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
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as TCHALLENGE_FORM_STEPS)
          }
        >
          <TabsList className="w-full">
            <TabsTrigger value={CHALLENGE_FORM_STEPS.init}>Infos</TabsTrigger>
            <TabsTrigger value={CHALLENGE_FORM_STEPS.actions}>
              Éco-gestes
            </TabsTrigger>
            <TabsTrigger value={CHALLENGE_FORM_STEPS.members}>
              Participants
            </TabsTrigger>
          </TabsList>

          <TabsContent value={CHALLENGE_FORM_STEPS.init} className="space-y-4">
            <Step1Init />
          </TabsContent>
          <TabsContent value={CHALLENGE_FORM_STEPS.actions} className="">
            <Step2Actions />
          </TabsContent>
          <TabsContent value={CHALLENGE_FORM_STEPS.members}>
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
