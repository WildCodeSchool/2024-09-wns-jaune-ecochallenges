import { RegisterFormValues } from '@/schemas/auth/register.schema';
import { PasswordInput } from '@/components';
import {
  Button,
  Input,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui';
import { useRegisterForm } from '@/hooks/auth/useRegisterForm';
import { useNavigate } from 'react-router-dom';
import {
  SignUpUserInput,
  useSignUpMutation,
} from '@/lib/graphql/generated/graphql-types';

type SignupProps = {
  onToggleForm: (isLoginMode: boolean) => void;
};

export const Signup = ({ onToggleForm }: SignupProps) => {
  const form = useRegisterForm();
  const navigate = useNavigate();
  const [signUpMutation] = useSignUpMutation();

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const formatedData: SignUpUserInput = {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        hashedPassword: values.password,
      };

      const { data } = await signUpMutation({
        variables: { data: formatedData },
      });

      if (!data?.signUp) throw new Error('Signup failed');

      const profile = JSON.parse(data.signUp);
      if (profile) {
        navigate('/user');
        onToggleForm(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 sm:space-y-4"
      >
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="firstname">Prénom</FormLabel>
                <FormControl>
                  <Input
                    id="firstname"
                    placeholder="Entrez votre prénom"
                    autoComplete="given-name"
                    className="border-2 border-black bg-[var(--color-input)] text-[var(--color-foreground)] outline-transparent placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="lastname">Nom</FormLabel>
                <FormControl>
                  <Input
                    id="lastname"
                    placeholder="Doe"
                    autoComplete="family-name"
                    className="border-2 border-black bg-[var(--color-input)] text-[var(--color-foreground)] placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    className="border-2 border-black bg-[var(--color-input)] text-[var(--color-foreground)] placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
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
                    autoComplete="new-password"
                    className="border-2 border-black bg-[var(--color-input)] text-[var(--color-foreground)] placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="confirmPassword">
                  Confirmez le mot de passe
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    id="confirmPassword"
                    placeholder="******"
                    autoComplete="new-password"
                    className="border-2 border-black bg-[var(--color-input)] text-[var(--color-foreground)] placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            S'inscrire
          </Button>
        </div>
      </form>
    </Form>
  );
};
