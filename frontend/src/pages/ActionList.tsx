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
    <div className="flex flex-col flex-wrap justify-center text-center align-middle xl:flex-row">
      {data.getActions.map((action: Action) => (
        <ActionCard key={action.id} action={action} />
      ))}
    </div>
  );
};
