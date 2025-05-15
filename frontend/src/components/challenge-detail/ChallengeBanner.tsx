
import { useGetChallengesAsChallengeQuery } from '@/lib/graphql/generated/graphql-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui';

import { Pill } from '@/components';

import { getUniqueTagsFromActions, formatChallengeDates } from '@/utils';

type Props = {
    challengeId: string;
  };

export const ChallengeBanner = ({ challengeId }: Props) => {
    
const { data, loading, error } = useGetChallengesAsChallengeQuery();
  if (loading) return <p className="p-4">Chargement...</p>;
  if (error) return <p className="p-4 text-red-500">Erreur : {error.message}</p>;

  const challenge = data?.getChallenges.find((c) => c.id === challengeId);

  if (!challenge) return <p className="p-4 text-gray-500">Challenge non trouvé</p>;

  const dates = formatChallengeDates(challenge.startDate, challenge.endDate);

  const tags = getUniqueTagsFromActions(challenge.actions)

console.log('tags', tags)

  return (
    <Card className="relative w-full overflow-hidden rounded-xl shadow-lg p-0">
  
    <CardHeader
      className="relative flex h-48 w-full flex-col justify-between bg-cover bg-center bg-[url(https://picsum.photos/1200/300)] p-4 "
    >
      <div className="absolute inset-0 z-0 bg-black/40 rounded-t-xl" />

        <CardTitle className="relative z-10 text-xl font-bold text-white">
          {challenge.label}
        </CardTitle>

        <div className="absolute  flex flex-col items-center top-4 right-4 z-10">
            <Avatar>
              <AvatarImage src="/public/images/ElieB.png" alt="Elie B" />
              <AvatarFallback>EB</AvatarFallback>
            </Avatar>
            <ul className="relative z-10 mt-2 flex flex-col gap-2">
              <li>
                <Pill className="bg-white/80 font-medium text-black">Rank</Pill>
              </li>

              <li className="w-12 bg-white/80 rounded-full px-2 py-1">
                  <Progress value={33} />
              </li>
            </ul>
          </div>

        </CardHeader>
        
      <div className="absolute flex flex-col gap-2  bottom-2 left-0 z-10 px-2">

        <ul className="flex w-full flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag?.id}>
              <Pill>
                <span className="mr-1 text-lg">{tag?.icon}</span>
                {tag?.name}
              </Pill>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          <Pill className="col-span-3 px-2">
          📅 {dates.startDate} → {dates.endDate}
          </Pill>
          <Pill className="col-span-2">
          {dates.timeLeft > 0
            ? `⌛ ${dates.timeLeft} d. left`
            : '❌ Ended'}
          </Pill>
        </div>

      </div>


  </Card>
  );
};
