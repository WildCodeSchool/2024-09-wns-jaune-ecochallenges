import { ChallengeForm } from '@/components/forms/challenge';
import { useGetChallengeQuery } from '@/lib/graphql/generated/graphql-types';
import { useUserStore } from '@/lib/zustand/userStore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const ChallengeEdition = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { data, loading, error } = useGetChallengeQuery({
    variables: { id: challengeId! },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (user?.role !== 'admin' && user?.id !== data?.getChallenge.owner?.id) {
    navigate(`/challenge/${challengeId}`);
    toast.error(`Vous n'avez pas les droits pour modifier ce challenge`);
    return null;
  }

  return <ChallengeForm challengeId={challengeId} />;
};
