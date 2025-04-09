import {
  Action,
  useGetActionsQuery,
} from '@/lib/graphql/generated/graphql-types';
import { ActionCard } from '@/components';

export const ActionList = () => {
  const { data, loading, error } = useGetActionsQuery();

  if (!data?.getActions) return <p>No eco-actions found</p>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:flex-wrap lg:justify-center">
      {data.getActions.map((action: Action) => (
        <ActionCard key={action.id} action={action} />
      ))}
    </div>
  );
};
