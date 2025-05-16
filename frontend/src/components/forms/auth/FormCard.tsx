import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components/ui';

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
    <Card className="mx-auto w-full max-w-sm p-4 shadow-lg sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-primary text-center text-lg">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="text-muted-foreground flex flex-col items-center gap-2 text-sm">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Separator orientation="horizontal" />
          <span className="text-muted-foreground mx-auto text-xs uppercase">
            ou
          </span>
        </div>
        <p className="text-center">
          {footerText}{' '}
          <Button
            variant="link"
            type="button"
            onClick={onToggleForm}
            className="underline"
          >
            {footerLinkText}
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};
