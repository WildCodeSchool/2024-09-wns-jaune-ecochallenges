import {
  Action,
  Challenge,
  useGetChallengeQuery,
  useGetUserActionChallengeByChallengeQuery,
  UserActionChallenge,
  UserActionChallengeInput,
} from '@/lib/graphql/generated/graphql-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle } from '@/components/ui';

import { Pill } from '@/components';

import {
  getUniqueTagsFromActions,
  formatChallengeDates,
  getProgressPercentageInChallenge,
} from '@/utils';

type Props = {
  challengeId: string;
};

export const ChallengeBanner = ({ challengeId }: Props) => {
  const {
    data: dataUserActionChallenge,
    loading: loadingUserActionChallenge,
    error: errorUserActionChallenge,
  } = useGetUserActionChallengeByChallengeQuery({
    variables: {
      getUserActionChallengeByChallengeId: challengeId,
    },
  });

  const { data, loading, error } = useGetChallengeQuery({
    variables: {
      id: challengeId,
    },
  });

  if (loading || loadingUserActionChallenge)
    return <p className="p-4">Chargement...</p>;
  if (error || errorUserActionChallenge)
    return <p className="p-4 text-red-500">Erreur : {error?.message}</p>;
  if (
    !data?.getChallenge ||
    !dataUserActionChallenge?.getUserActionChallengeByChallenge
  )
    return <p className="p-4 text-gray-500">Challenge non trouvé</p>;

  const getPercentageActionsDone = getProgressPercentageInChallenge(
    data.getChallenge as Challenge,
    dataUserActionChallenge.getUserActionChallengeByChallenge as UserActionChallenge[]
  );

  const dates = formatChallengeDates(
    data.getChallenge.startDate,
    data.getChallenge.endDate
  );
  const tags = getUniqueTagsFromActions(data.getChallenge.actions as Action[]);

  return (
    <Card className="relative w-full overflow-hidden rounded-xl p-0 shadow-lg">
      <CardHeader className="relative flex h-48 w-full flex-col justify-between bg-[url(https://picsum.photos/1200/300)] bg-cover bg-center p-4">
        <div className="absolute inset-0 z-0 rounded-t-xl bg-black/40" />

        <CardTitle className="relative z-10 text-xl font-bold text-white">
          {data.getChallenge.label}
        </CardTitle>

        <div className="absolute top-4 right-4 z-10 flex flex-col items-center">
          <Avatar>
            <AvatarImage src="/public/images/ElieB.png" alt="Elie B" />
            <AvatarFallback>EB</AvatarFallback>
          </Avatar>
          <ul className="relative z-10 mt-2 flex flex-col gap-2">
            <li>
              <Pill className="bg-white/80 font-medium text-black">Rank</Pill>
            </li>

            <li className="w-15 rounded-full bg-white/80 px-2 py-1">
              <Progress value={getPercentageActionsDone} />
            </li>
          </ul>
        </div>
      </CardHeader>

      <div className="absolute bottom-2 left-0 z-10 flex flex-col gap-2 px-2">
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
            {dates.timeLeft > 0 ? `⌛ ${dates.timeLeft} d. left` : '❌ Ended'}
          </Pill>
        </div>
      </div>
    </Card>
  );
};
