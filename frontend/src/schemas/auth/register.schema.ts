import { z } from 'zod';

export const registerSchema = z
  .object({
    firstname: z
      .string()
      .min(2, { message: 'Le prénom doit faire au moins 2 caractères' }),

    lastname: z
      .string()
      .min(2, { message: 'Le nom doit faire au moins 2 caractères' }),

    email: z.string().email({ message: 'Adresse email invalide' }),

    password: z
      .string()
      .min(6, {
        message: 'Le mot de passe doit contenir au moins 6 caractères',
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
