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

export const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const dates = {
    startDate: new Date(challenge.startDate).toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
    }),
    endDate: new Date(challenge.endDate).toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
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
      <Link to={`/challenges`}>
        <Card className="relative h-full justify-between bg-linear-to-br from-slate-100 to-slate-200 transition-colors hover:bg-linear-to-br hover:from-slate-200 hover:to-slate-300 active:bg-linear-to-br active:from-slate-300 active:to-slate-400">
          <CardHeader className="overflow-hidden">
            <img
              src="https://picsum.photos/400/100"
              alt={challenge.label}
              className="absolute top-0 left-0 z-0 h-16 w-full rounded-t-lg"
            />

            <CardTitle className="absolute top-0 left-0 z-10 flex h-16 w-full items-center justify-center rounded-t-lg text-white shadow-black drop-shadow-lg backdrop-blur-[2px]">
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
