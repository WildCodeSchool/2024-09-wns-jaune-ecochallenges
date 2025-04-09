import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Le composant RegisterForm sera passé en tant que children
export const FormCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Ici, nous rendons les children passés, ce qui pourrait être RegisterForm */}
        {children}
      </CardContent>
      <CardFooter className="flex justify-between">Card footer</CardFooter>
    </Card>
  );
};
