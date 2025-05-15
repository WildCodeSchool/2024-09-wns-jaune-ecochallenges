import { z } from 'zod';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Check, Trash } from 'lucide-react';
import { useCreateActionMutation } from '@/lib/graphql/generated/graphql-types';
import { GET_ACTIONS } from '@/lib/graphql/operations';
import { useNavigate } from 'react-router-dom';

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
});

type FormType = z.infer<typeof formSchema>;

export const ActionForm = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      requires_view: false,
      level: 1,
      icon: 'leaf',
      time: 1,
    },
  });

  const [activeTab, setActiveTab] = useState('step1');

  const getTabWithErrors = (errors: typeof form.formState.errors) => {
    if (
      errors.name ||
      errors.description ||
      errors.requires_view ||
      errors.level ||
      errors.icon ||
      errors.time
    ) {
      return 'step1';
    }
    //if (errors.tags) return 'step2';
    return null;
  };

  const navigate = useNavigate();

  const onError = (errors: typeof form.formState.errors) => {
    const errorTab = getTabWithErrors(errors);
    if (!errorTab) return;
    setActiveTab(errorTab);
  };

  const onSubmit = async (formData: FormType) => {
    try {
      const challengeData = {
        name: formData.name,
        description: formData.description,
        requires_view: formData.requires_view,
        level: formData.level,
        icon: formData.icon,
        time: formData.time,
      };

      const response = await createAction({
        variables: {
          data: challengeData,
        },
      });

      if (response.errors) throw new Error(response.errors[0].message);
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };

  const [createAction] = useCreateActionMutation({
    refetchQueries: [
      {
        query: GET_ACTIONS,
      },
    ],
    onCompleted: () => {
      //! TODO: redirect to the action page
      navigate(`/actions`);
    },
  });
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
                <DialogTitle>Supprimer l'eco-geste</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer cet eco-geste ? Cette
                  action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="button">Confirmer</Button>
                <DialogClose asChild>
                  <Button>Annuler</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
