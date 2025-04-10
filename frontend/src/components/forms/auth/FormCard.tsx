import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

export const FormCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="mx-auto w-full max-w-sm rounded-2xl p-4 shadow-md sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          Create your account
        </CardTitle>
        <CardDescription className="text-center">SignUp Form</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="text-muted-foreground flex flex-col items-center gap-2 text-sm">
        <div className="flex w-full items-center justify-center gap-2">
          <span className="bg-border h-px w-full" />
          <span className="text-muted-foreground text-xs uppercase">ou</span>
          <span className="bg-border h-px w-full" />
        </div>
        <p>
          Vous avez déjà un compte ?{' '}
          <Link to="/login" className="text-primary underline hover:opacity-80">
            Se connecter
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
