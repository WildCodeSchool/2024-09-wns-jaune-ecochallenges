import { Link } from 'react-router-dom';
import {
  Action,
  GetChallengeQuery,
} from '@/lib/graphql/generated/graphql-types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { Pill } from '@/components';
import { cn } from '@/lib/utils';
import { getUniqueTagsFromActions, formatChallengeDates } from '@/utils';

export const ChallengeCard = ({
  challenge,
}: {
  challenge: GetChallengeQuery['getChallenge'];
}) => {
  const dates = formatChallengeDates(challenge.startDate, challenge.endDate);

  return (
    <article className="h-full">
      <Link to={`/challenge-detail/${challenge.id}`}>
        <Card
          data-testid={`card-${challenge.id}`}
          className={cn('relative h-full justify-between')}
        >
          <CardHeader className="overflow-hidden">
            <img
              src={challenge.bannerUrl || ''}
              alt={challenge.label}
              className="absolute top-0 left-0 z-0 h-20 w-full rounded-t-lg object-cover"
            />

            <CardTitle className="text-primary-foreground top-calc(50%) text-shadow-foreground/60 absolute left-1/2 z-10 flex h-8 w-full -translate-x-1/2 items-center justify-center rounded-lg backdrop-blur-xs text-shadow-lg">
              <h2>{challenge.label}</h2>
            </CardTitle>
          </CardHeader>

          <CardContent className="mt-8">
            <CardDescription className="text-justify">
              {challenge.description}
            </CardDescription>
          </CardContent>

          <CardFooter className="block w-full space-y-2">
            <ul className="flex w-full flex-wrap gap-2">
              {getUniqueTagsFromActions(challenge.actions as Action[]).map(
                (tag) => (
                  <li key={`${challenge.id}-${tag?.id}`}>
                    <Pill>
                      <span className="mr-1 text-lg">{tag?.icon}</span>
                      {tag?.name}
                    </Pill>
                  </li>
                )
              )}
            </ul>

            <div className="grid grid-cols-5 gap-2">
              <Pill className="col-span-3 px-2">
                📅 {dates.startDate} → {dates.endDate}
              </Pill>

              <Pill className="col-span-2">
                {dates.timeLeft > 0
                  ? `⌛ ${dates.timeLeft} d. left`
                  : '❌ Ended'}
              </Pill>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </article>
  );
};
