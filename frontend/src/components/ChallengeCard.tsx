import { Link } from 'react-router-dom';
import { Challenge } from '@/lib/graphql/generated/graphql-types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Pill } from '@/components';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export const ChallengeCard = ({
  challenge,
}: {
  challenge: Omit<Challenge, 'actions'>;
}) => {
  const dates = {
    startDate: format(new Date(challenge.startDate), 'dd LLL', {
      locale: fr,
    }),
    endDate: format(new Date(challenge.endDate), 'dd LLL', {
      locale: fr,
    }),
    timeLeft: Math.floor(
      (new Date(challenge.endDate).getTime() - new Date().getTime()) /
        1000 /
        60 /
        60 /
        24
    ),
  };

  const tags = [
    '🥦 food',
    '🚗 transport',
    '💡 energy',
    '🗑️ waste',
    '💧 water',
    '💻 tech',
  ]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 1);

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
              {tags.map((tag) => (
                <li key={tag}>
                  <Pill>{tag}</Pill>
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
