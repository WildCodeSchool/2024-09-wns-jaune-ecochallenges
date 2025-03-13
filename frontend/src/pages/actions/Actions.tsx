import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Action } from '@/lib/graphql/generated/graphql-types';
import { GET_ACTIONS } from '@/lib/graphql/operations';
import { useQuery } from '@apollo/client';

function Actions() {
  const { data, loading, error } = useQuery(GET_ACTIONS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <div className="flex min-w-1/4 flex-wrap justify-center gap-4 text-center">
      {data.getActions.map((action: Action) => (
        <Card key={action.id} className="bg-teal-50">
          <CardHeader>
            <CardTitle>{action.name}</CardTitle>
            <CardDescription>{action.description}</CardDescription>
          </CardHeader>

          <CardFooter>
            <p>Date de création: {action.createdAt.split('T')[0]}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Actions;
