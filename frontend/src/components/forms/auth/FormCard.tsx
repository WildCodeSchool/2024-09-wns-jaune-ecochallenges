import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, useLocation } from 'react-router-dom';

export const FormCard = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  const isLogin = pathname === '/login';

  const title = isLogin ? 'Welcome back' : 'Create your account';
  const description = isLogin ? 'Login Form' : 'SignUp Form';
  const footerText = isLogin
    ? "Vous n'avez pas encore de compte ?"
    : 'Vous avez déjà un compte ?';
  const footerLinkText = isLogin ? 'Créer un compte' : 'Se connecter';
  const footerLinkTo = isLogin ? '/signup' : '/login';

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
          <Link
            to={footerLinkTo}
            className="text-primary underline hover:opacity-80"
          >
            {footerLinkText}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
