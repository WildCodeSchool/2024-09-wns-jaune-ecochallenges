import { RegisterFormValues } from '@/schemas';
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
import type { FieldErrors } from 'react-hook-form';
import { useState } from 'react';
import { ApolloError } from '@apollo/client';

export const Signup = ({ onToggleForm }: SignupProps) => {
  const form = useRegisterForm();
  const navigate = useNavigate();
  const [signUpMutation] = useSignUpMutation();
  const [serverError, setServerError] = useState<string | null>(null);
  const onSubmit = async (values: RegisterFormValues) => {
    setServerError(null);
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
    } catch (err) {
      if (err instanceof ApolloError) {
        const gqlMsg = err.graphQLErrors?.[0]?.message;

        if (gqlMsg?.includes('email')) {
          form.setError('email', { type: 'server', message: gqlMsg });
        }

        setServerError(gqlMsg ?? 'Erreur inconnue');
      } else {
        setServerError('Une erreur est survenue');
      }
    }
  };

  const onInvalid = (errors: FieldErrors<RegisterFormValues>) => {
    const first = Object.keys(errors)[0] as
      | keyof RegisterFormValues
      | undefined;
    if (first) form.setFocus(first);
  };

  return (
    <div>
      {serverError && (
        <p
          data-testid="signup-global-error"
          role="alert"
          aria-live="assertive"
          className="my-2 text-center text-sm text-red-600"
          id="signup-desc"
        >
          {serverError}
        </p>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="space-y-2 sm:space-y-4"
          aria-labelledby="signup-title"
          aria-describedby={serverError ? 'signup-desc' : undefined}
          noValidate
        >
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => {
                const err = form.formState.errors.firstname?.message as
                  | string
                  | undefined;
                const errId = 'firstname-error';
                return (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="firstname">Prénom</FormLabel>
                    <FormControl>
                      <Input
                        id="firstname"
                        placeholder="Entrez votre prénom"
                        autoComplete="given-name"
                        className="bg-input border-foreground"
                        required
                        aria-required="true"
                        aria-invalid={!!err}
                        aria-describedby={err ? errId : undefined}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id={errId} role="alert" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => {
                const err = form.formState.errors.lastname?.message as
                  | string
                  | undefined;
                const errId = 'lastname-error';
                return (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="lastname">Nom</FormLabel>
                    <FormControl>
                      <Input
                        id="lastname"
                        placeholder="Doe"
                        autoComplete="family-name"
                        required
                        aria-required="true"
                        aria-invalid={!!err}
                        aria-describedby={err ? errId : undefined}
                        className="bg-input border-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id={errId} role="alert" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                const errorMsg = form.formState.errors.email?.message as
                  | string
                  | undefined;
                const errorId = 'email-error';
                return (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="johndoe@mail.com"
                        type="email"
                        required
                        aria-required="true"
                        autoComplete="email"
                        aria-invalid={!!errorMsg}
                        aria-describedby={errorMsg ? errorId : undefined}
                        className="bg-input border-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id={errorId} role="alert" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                const err = form.formState.errors.password?.message as
                  | string
                  | undefined;
                const errId = 'password-error';
                return (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="password">Mot de passe</FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="******"
                        autoComplete="new-password"
                        required
                        aria-required="true"
                        aria-invalid={!!err}
                        aria-describedby={err ? errId : undefined}
                        className="bg-input border-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id={errId} role="alert" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => {
                const err = form.formState.errors.confirmPassword?.message as
                  | string
                  | undefined;
                const errId = 'confirmPassword-error';
                return (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="confirmPassword">
                      Confirmez le mot de passe
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="confirmPassword"
                        placeholder="******"
                        autoComplete="new-password"
                        required
                        aria-required="true"
                        aria-invalid={!!err}
                        aria-describedby={err ? errId : undefined}
                        className="bg-input border-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id={errId} role="alert" />
                  </FormItem>
                );
              }}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
              aria-busy={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Envoi en cours…' : "S'inscrire"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
