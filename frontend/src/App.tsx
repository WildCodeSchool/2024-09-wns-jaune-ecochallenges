import { Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ACTIONS } from './lib/graphql/operations';
import { Action } from './lib/graphql/generated/graphql-types';

function App() {
  const { data, loading, error } = useQuery(GET_ACTIONS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <>
      <h1 className="rounded-full text-center text-3xl font-bold text-red-500 underline">
        Hello world with tailwind css!
      </h1>
      <div className="flex flex-col gap-4 text-center">
        {data.getActions.map((action: Action) => (
          <div key={action.id}>
            <h2>{action.name}</h2>
            <p>{action.description}</p>
            <p>{action.requires_view}</p>
            <p>{action.createdAt}</p>
          </div>
        ))}
      </div>
      <Outlet />
    </>
  );
}

export default App;
