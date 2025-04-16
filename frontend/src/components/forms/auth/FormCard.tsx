import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type FormCardProps = {
  children: React.ReactNode;
  variant: 'login' | 'signup';
  onToggleForm: () => void;
};

export const FormCard = ({
  children,
  variant,
  onToggleForm,
}: FormCardProps) => {
  const isLogin = variant === 'login';

  const title = isLogin ? 'Bienvenue' : 'Créez votre compte';
  const footerText = isLogin
    ? "Vous n'avez pas encore de compte ?"
    : 'Vous avez déjà un compte ?';
  const footerLinkText = isLogin ? 'Créer un compte' : 'Se connecter';

  return (
    <Card className="bg-card mx-auto w-full max-w-sm rounded-[var(--radius-lg)] p-4 shadow-lg sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-lg text-[var(--color-primary)]">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="flex flex-col items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
        <div className="flex w-full items-center justify-center gap-2">
          <span className="h-px w-full bg-[var(--color-border)]" />
          <span className="text-xs text-[var(--color-muted-foreground)] uppercase">
            ou
          </span>
          <span className="h-px w-full bg-[var(--color-border)]" />
        </div>
        <p>
          {footerText}{' '}
          <button
            type="button"
            onClick={onToggleForm}
            className="text-[var(--color-primary)] underline hover:opacity-80"
          >
            {footerLinkText}
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};
