import {
  Action,
  GetChallengeQuery,
  UserActionChallengeScore,
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
  challenge: GetChallengeQuery['getChallenge'];
  userActionChallengesScore: Partial<UserActionChallengeScore>[];
};

export const ChallengeBanner = ({
  challenge,
  userActionChallengesScore,
}: Props) => {
  const getPercentageActionsDone = getProgressPercentageInChallenge(
    challenge,
    userActionChallengesScore
  );

  const dates = formatChallengeDates(
    challengeData?.getChallenge.startDate,
    challengeData?.getChallenge.endDate
  );

  const tags = getUniqueTagsFromActions(challenge.actions as Action[]);

  return (
    <Card className="relative w-full overflow-hidden rounded-xl p-0 shadow-lg">
      <CardHeader className="relative flex h-48 w-full flex-col justify-between bg-[url(https://picsum.photos/1200/300)] bg-cover bg-center p-4 md:h-64 lg:h-72">
        <div className="bg-foreground/30 absolute inset-0 z-0 rounded-t-xl" />

        <CardTitle className="text-background relative z-10 text-xl font-bold">
          {challenge.label}
        </CardTitle>
        <div className="absolute top-4 right-4 z-10 flex flex-col items-center md:items-end md:gap-4">
          <Avatar>
            <AvatarImage src="/public/images/ElieB.png" alt="Elie B" />
            <AvatarFallback>
              {challenge.owner.lastname.charAt(0).toUpperCase()}{' '}
              {challenge.owner.firstname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ul className="relative z-10 mt-2 flex flex-col gap-2">
            <li>
              <Pill className="bg-background font-medium">Rank</Pill>
            </li>

            <li className="bg-background text-foreground w-full rounded-lg px-2 py-1 text-xs">
              Complété à: <strong>{getPercentageActionsDone}%</strong>
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
