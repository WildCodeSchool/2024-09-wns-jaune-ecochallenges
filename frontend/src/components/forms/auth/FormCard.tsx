import {
  Card,
  CardContent,
  CardDescription,
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
  const description = isLogin
    ? 'Formulaire de connexion'
    : "Formulaire d'inscription";
  const footerText = isLogin
    ? "Vous n'avez pas encore de compte ?"
    : 'Vous avez déjà un compte ?';
  const footerLinkText = isLogin ? 'Créer un compte' : 'Se connecter';

  return (
    <Card className="mx-auto w-full max-w-sm rounded-2xl p-4 shadow-md sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-xl">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="text-muted-foreground flex flex-col items-center gap-2 text-sm">
        <div className="flex w-full items-center justify-center gap-2">
          <span className="bg-border h-px w-full" />
          <span className="text-muted-foreground text-xs uppercase">ou</span>
          <span className="bg-border h-px w-full" />
        </div>
        <p>
          {footerText}{' '}
          <button
            type="button"
            onClick={onToggleForm}
            className="text-primary underline hover:opacity-80"
          >
            {footerLinkText}
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};
