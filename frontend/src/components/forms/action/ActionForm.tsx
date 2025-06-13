import { z } from 'zod';
import {
  Button,
  Form,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Step1Init, Step2Tags } from '@/components/forms/action';
import { useState } from 'react';
import { Check } from 'lucide-react';
import {
  useCreateActionMutation,
  useGetActionQuery,
  useUpdateActionMutation,
} from '@/lib/graphql/generated/graphql-types';
import { GET_ACTIONS } from '@/lib/graphql/operations';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message:
        'Vous devez obligatoirement nommer votre eco-geste pour le créer',
    })
    .max(100, {
      message: 'Le nom de votre eco-geste ne doit pas dépasser 100 caractères',
    }),
  description: z
    .string()
    .min(1, {
      message:
        'Vous devez obligatoirement décrire votre eco-geste pour le créer',
    })
    .max(300, {
      message:
        'La description de votre eco-geste ne doit pas dépasser 300 caractères',
    }),
  requires_view: z.boolean({
    required_error:
      'Vous devez obligatoirement choisir si votre eco-geste nécessitera une validation externe ou non',
  }),
  level: z.number({
    required_error:
      'Vous devez obligatoirement choisir le niveau de difficulté de réalisation de votre eco-geste',
  }),
  icon: z.string({}),
  time: z.number({
    required_error:
      'Vous devez obligatoirement indiquer le temps de réalisation de votre eco-geste',
  }),
  tags: z.array(z.string()).optional(),
});

type FormType = z.infer<typeof formSchema>;

export const ActionForm = ({ actionId }: { actionId?: string }) => {
  const { data, loading, error } = useGetActionQuery({
    skip: !actionId,
    variables: { id: actionId! },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    values: data?.getAction && {
      name: data.getAction.name,
      description: data.getAction.description,
      requires_view: data.getAction.requires_view,
      level: data.getAction.level,
      icon: data.getAction.icon,
      time: data.getAction.time,
      tags: data.getAction.tags?.map((tag) => tag.id) || [],
    },
    defaultValues: {
      name: '',
      description: '',
      requires_view: false,
      level: 1,
      icon: 'leaf',
      time: 1,
      tags: [],
    },
  });

  const [activeTab, setActiveTab] = useState('step1');

  const getTabWithErrors = (errors: typeof form.formState.errors) => {
    if (
      errors.name ||
      errors.description ||
      errors.requires_view ||
      errors.level ||
      errors.time
    ) {
      return 'step1';
    }
    return null;
  };

  const navigate = useNavigate();

  const onError = (errors: typeof form.formState.errors) => {
    const errorTab = getTabWithErrors(errors);
    if (!errorTab) return;
    setActiveTab(errorTab);
    toast.error('Veuillez corriger les erreurs avant de continuer');
  };

  const onSubmit = async (formData: FormType) => {
    try {
      let icon = 'sprout';
      if (formData.level === 1) icon = 'sprout';
      else if (formData.level === 2) icon = 'leaf';
      else if (formData.level === 3) icon = 'tree-palm';
      const actionData = {
        name: formData.name,
        description: formData.description,
        requires_view: formData.requires_view,
        level: formData.level,
        icon: icon,
        time: formData.time,
        tags: formData.tags,
      };

      const response = actionId
        ? await updateAction({
            variables: {
              id: actionId,
              data: actionData,
            },
          })
        : await createAction({
            variables: {
              data: actionData,
            },
          });
      if (response.errors) throw new Error(response.errors[0].message);
    } catch (error) {
      console.error('Error creating action:', error);
    }
  };

  const [createAction] = useCreateActionMutation({
    refetchQueries: [
      {
        query: GET_ACTIONS,
      },
    ],
    onCompleted: () => {
      toast.success('Eco-geste créé avec succès');
      navigate(`/actions`);
    },
    onError: () => {
      toast.error("Erreur lors de la création de l'éco-geste");
    },
  });

  const [updateAction] = useUpdateActionMutation({
    refetchQueries: [
      {
        query: GET_ACTIONS,
      },
    ],
    onCompleted: () => {
      toast.success('Eco-geste modifié avec succès');
      navigate(`/actions`);
    },
    onError: () => {
      toast.error("Erreur lors de la modification de l'éco-geste");
    },
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue : {error.message}</div>;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="step1">Infos</TabsTrigger>
            <TabsTrigger value="step2">Tags</TabsTrigger>
          </TabsList>

          <TabsContent value="step1" className="space-y-4">
            <Step1Init />
          </TabsContent>
          <TabsContent value="step2" className="">
            <Step2Tags />
          </TabsContent>
        </Tabs>
        <div className="fixed right-4 bottom-20 z-50 flex flex-col gap-4">
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
