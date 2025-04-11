// schemas/auth/login.schema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Adresse email invalide' }),
  password: z
    .string()
    .min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
    .regex(/[a-zA-Z0-9]/, {
      message: 'Le mot de passe doit être alphanumérique',
    }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
