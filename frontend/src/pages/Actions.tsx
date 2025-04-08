import ActionCard from '@/components/ActionCard';
import { Action } from '@/lib/graphql/generated/graphql-types';
import { GET_ACTIONS } from '@/lib/graphql/operations';
import { useQuery } from '@apollo/client';

export const Actions = () => {
  const { data, loading, error } = useQuery(GET_ACTIONS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col flex-nowrap justify-center gap-1 xl:flex-row xl:flex-wrap xl:items-stretch xl:gap-3">
      {data.getActions.map((action: Action) => (
        <ActionCard key={action.id} action={action} />
      ))}
    </div>
  );
};
