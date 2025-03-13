import ActionCard from '@/components/ActionCard';
import { Action } from '@/lib/graphql/generated/graphql-types';
import { GET_ACTIONS } from '@/lib/graphql/operations';
import { useQuery } from '@apollo/client';

function Actions() {
  const { data, loading, error } = useQuery(GET_ACTIONS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-wrap justify-center text-center align-middle">
      {data.getActions.map((action: Action) => (
        <ActionCard {...action} />
      ))}
    </div>
  );
}

export default Actions;
