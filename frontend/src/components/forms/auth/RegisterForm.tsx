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

export const RegisterForm = () => {
  const form = useRegisterForm();

  const onSubmit = (values: RegisterFormValues) => {
    try {
      console.log('Form submitted:', values);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          {/* Firstname */}
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
                    className="bg-background text-foreground border-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Lastname */}
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
                    className="bg-background text-foreground border-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
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
                    className="bg-background text-foreground border-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
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
                    className="bg-background text-foreground border-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
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
                    className="bg-background text-foreground border-input"
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
