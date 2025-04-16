// components/forms/auth/Login.tsx
import { LoginFormValues } from '@/schemas/auth/login.schema';
import {
  Button,
  Input,
  PasswordInput,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui';
import { useLoginForm } from '@/hooks/auth/useLoginForm';
import {
  LoginUserInput,
  useLogInMutation,
} from '@/lib/graphql/generated/graphql-types';
import { useUserStore } from '@/lib/zustand/userStore'; // Assure-toi d'importer correctement ton store
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const form = useLoginForm();
  const navigate = useNavigate();
  const setUserToStore = useUserStore((state) => state.login);
  const [logInMutation] = useLogInMutation();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const formatedData: LoginUserInput = {
        email: values.email,
        hashedPassword: values.password,
      };

      const { data } = await logInMutation({
        variables: { data: formatedData },
      });

      if (!data?.logIn) throw new Error('Login failed');

      const profile = JSON.parse(data.logIn);
      setUserToStore(profile);
      navigate('/');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="password">Mot de passe</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="password"
                    placeholder="******"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </div>
      </form>
    </Form>
  );
};
