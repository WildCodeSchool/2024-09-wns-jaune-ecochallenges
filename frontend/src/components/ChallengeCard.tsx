import { Link } from 'react-router-dom';
import { Challenge } from '@/lib/graphql/generated/graphql-types';
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

export const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const dates = formatChallengeDates(challenge.startDate, challenge.endDate);

  return (
    <article className="h-full">
      <Link to={`/challenge/${challenge.id}/edit`}>
        <Card className={cn('relative h-full justify-between')}>
          <CardHeader className="overflow-hidden">
            <img
              src="https://picsum.photos/400/100"
              alt={challenge.label}
              className="absolute top-0 left-0 z-0 h-16 w-full rounded-t-lg"
            />

            <CardTitle className="text-secondary absolute top-0 left-0 z-10 flex h-16 w-full items-center justify-center rounded-t-lg backdrop-blur-[4px] text-shadow-black/30 text-shadow-lg">
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
              {getUniqueTagsFromActions(challenge.actions).map((tag) => (
                <li key={tag?.id}>
                  <Pill>
                    <span className="mr-1 text-lg">{tag?.icon}</span>
                    {tag?.name}
                  </Pill>
                </li>
              ))}
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
