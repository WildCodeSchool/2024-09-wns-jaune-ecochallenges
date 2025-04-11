import { z } from 'zod';
import { registerSchema } from '@/schemas/auth/login.schema';

export type RegisterFormValues = z.infer<typeof registerSchema>;
