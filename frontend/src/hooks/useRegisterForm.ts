import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerSchema, RegisterFormValues } from '@/schemas/register.schema';

export const useRegisterForm = () =>
  useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });
