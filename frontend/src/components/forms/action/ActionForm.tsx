import { Form } from 'react-router-dom';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Step1Init, Step2Tags } from '@/components/forms/action';

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
      time: 0,
    },
  });
  return (
    <Form {...form}>
      <form className="relative">
        <Tabs>
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
      </form>
    </Form>
  );
};
