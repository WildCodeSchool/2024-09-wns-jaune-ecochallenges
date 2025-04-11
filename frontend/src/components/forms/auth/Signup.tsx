import { RegisterFormValues } from '@/schemas/auth/register.schema';
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
import { useRegisterForm } from '@/hooks/auth/useRegisterForm';
import { useNavigate } from 'react-router-dom';
import {
  SignUpUserInput,
  useSignUpMutation,
} from '@/lib/graphql/generated/graphql-types';
import { useUserStore } from '@/lib/zustand/userStore';

export const Signup = () => {
  const form = useRegisterForm();
  const navigate = useNavigate();
  const setUserToStore = useUserStore((state) => state.login);
  const [signUpMutation] = useSignUpMutation();

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const formatedData: SignUpUserInput = {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        hashedPassword: values.password,
      };

      const data = await signUpMutation({
        variables: { data: formatedData },
      });

      if (!data.data?.signUp) throw new Error('Login failed');
      const profile = JSON.parse(data.data.signUp);
      if (profile) {
        setUserToStore(profile);
        navigate('/');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // // Fausse inscription
  // const handleFakeSignup = () => {
  //   const fakeData: RegisterFormValues = {
  //     firstname: 'John',
  //     lastname: 'Doe',
  //     email: 'johndoe@mail.com',
  //     password: 'Hello123+',
  //     confirmPassword: 'Hello123+',
  //   };

  //   form.setValue('firstname', fakeData.firstname);
  //   form.setValue('lastname', fakeData.lastname);
  //   form.setValue('email', fakeData.email);
  //   form.setValue('password', fakeData.password);
  //   form.setValue('confirmPassword', fakeData.confirmPassword);

  //   // 👉 Bascule vers le formulaire de login sans redirection ni mutation
  //   if (onToggleForm) {
  //     onToggleForm();
  //   }
  // };

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
                    placeholder="John"
                    autoComplete="given-name"
                    className="bg-background text-foreground border-input w-full"
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
                    className="bg-background text-foreground border-input w-full"
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
                    className="bg-background text-foreground border-input w-full"
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
                    className="bg-background text-foreground border-input w-full"
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
                    className="bg-background text-foreground border-input w-full"
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

          {/* <Button
            type="button"
            onClick={handleFakeSignup}
            variant="secondary"
            className="w-full"
          >
            Fake Inscription
          </Button> */}
        </div>
      </form>
    </Form>
  );
};
