// hooks/auth/useLoginForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, LoginFormValues } from '@/schemas/auth';

export const useLoginForm = () =>
  useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
