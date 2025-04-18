import { z } from 'zod';

export const registerSchema = z
  .object({
    firstname: z
      .string()
      .min(2, { message: 'Le prénom doit faire au moins 2 caractères' })
      .max(100, { message: 'Le prénom ne doit pas dépasser 100 caractères' }),

    lastname: z
      .string()
      .min(2, { message: 'Le nom doit faire au moins 2 caractères' })
      .max(100, { message: 'Le nom ne doit pas dépasser 100 caractères' }),

    email: z.string().email({ message: 'Adresse email invalide' }).max(255, {
      message: 'L’adresse email ne doit pas dépasser 255 caractères',
    }),

    password: z
      .string()
      .min(6, {
        message: 'Le mot de passe doit contenir au moins 6 caractères',
      })
      .max(128, {
        message: 'Le mot de passe ne doit pas dépasser 128 caractères',
      })
      .regex(/[a-zA-Z0-9]/, {
        message: 'Le mot de passe doit être alphanumérique',
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Les mots de passe ne correspondent pas',
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
