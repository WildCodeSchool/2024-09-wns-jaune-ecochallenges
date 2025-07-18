import { z } from 'zod';

export const actionschema = z.object({
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

export type ActionFormValues = z.infer<typeof actionschema>;
