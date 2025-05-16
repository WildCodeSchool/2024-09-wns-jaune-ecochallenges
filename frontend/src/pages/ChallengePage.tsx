import { Link, useParams } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui';
import { useGetChallengeQuery } from '@/lib/graphql/generated/graphql-types';
import { useUserStore } from '@/lib/zustand/userStore';

export const ChallengePage = () => {
  const { challengeId } = useParams();
  const user = useUserStore((state) => state.user);
  const { data, loading, error } = useGetChallengeQuery({
    skip: !challengeId,
    variables: { id: challengeId! },
  });

  const canEdit =
    user?.role == 'admin' || user?.id == data?.getChallenge.owner?.id;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h2>{data?.getChallenge.label}</h2>

      <div>⚠️ en travaux</div>

      {canEdit && (
        <div className="fixed right-4 bottom-20 z-50 flex flex-col gap-4">
          <Button
            variant="default"
            className="size-14 rounded-full shadow-md shadow-black/50"
          >
            <Link to={`/challenge/${challengeId}/edit`}>
              <Pencil className="size-6" strokeWidth={1.4} />
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};
