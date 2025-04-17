import { z } from 'zod';
import { registerSchema } from '@/schemas/auth/register.schema';

export type RegisterFormValues = z.infer<typeof registerSchema>;
