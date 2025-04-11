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
import {
  SignUpUserInput,
  useSignUpMutation,
} from '@/lib/graphql/generated/graphql-types';

export const Signup = () => {
  const form = useRegisterForm();
  const [signUpMutation] = useSignUpMutation();

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const formatedData: SignUpUserInput = {
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        hashedPassword: values.password,
      };

      //TODO a voir ce qu'on fait avec le store ici ???
      const data = await signUpMutation({
        variables: { data: formatedData },
      });
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
        </div>
      </form>
    </Form>
  );
};
