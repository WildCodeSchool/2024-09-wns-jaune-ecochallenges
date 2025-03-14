import { ChallengeCard } from '@/components/ChallengeCard';
import { useGetChallengesAsChallengeQuery } from '@/lib/graphql/generated/graphql-types';

export const ChallengeList = () => {
  const { data, loading, error } = useGetChallengesAsChallengeQuery();
  console.log(data?.getChallenges);

  if (!data?.getChallenges) return <p>No challenges found</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const challenges = [...data.getChallenges].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  return (
    <ul className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-3 xl:grid-cols-3 xl:gap-4">
      {challenges.map((challenge) => (
        <li key={challenge.id}>
          <ChallengeCard key={challenge.id} challenge={challenge} />
        </li>
      ))}
    </ul>
  );
};
