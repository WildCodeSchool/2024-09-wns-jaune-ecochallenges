import { ChallengeCard } from '@/components';
import { Button } from '@/components/ui/button';
import { useGetChallengesAsChallengeQuery } from '@/lib/graphql/generated/graphql-types';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ChallengeList = () => {
  const { data, loading, error } = useGetChallengesAsChallengeQuery();

  if (!data?.getChallenges) return <p>No challenges found</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const challenges = [...data.getChallenges].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  return (
    <div className="relative">
      <ul className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-3 xl:grid-cols-3 xl:gap-4">
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <ChallengeCard key={challenge.id} challenge={challenge} />
          </li>
        ))}
      </ul>

      <Button
        asChild
        variant="default"
        className="fixed right-4 bottom-20 z-50 size-14 rounded-full shadow-md shadow-black/50"
      >
        <Link to="/challenge/new">
          <Plus className="size-10" strokeWidth={1.4} />
        </Link>
      </Button>
    </div>
  );
};
