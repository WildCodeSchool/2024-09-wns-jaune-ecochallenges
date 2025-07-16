import { GetUsersAsUserQuery } from '@/lib/graphql/generated/graphql-types';
import { Button, Card, CardContent } from './ui';
import { CircleCheck, CirclePlus } from 'lucide-react';

type UserCardContent =
  | { type: 'user'; user: GetUsersAsUserQuery['getUsersAsUser'][number] }
  | { type: 'invite'; email: string };

export const UserCard = ({
  content,
  isSelected = false,
  onClick,
}: {
  content: UserCardContent;
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  const displayName =
    content.type === 'invite'
      ? content.email
      : `${content.user.firstname} ${content.user.lastname}`;

  return (
    <article className="h-full w-full">
      <Card className="h-full">
        <CardContent className="flex items-center justify-between gap-2 p-4">
          <p className="ml-6 text-xl">{displayName}</p>
          <Button
            type="button"
            variant="ghost"
            className="hover:bg-transparent hover:opacity-100"
            onClick={onClick}
          >
            {isSelected ? (
              <CircleCheck
                data-testid="member-card-button"
                className="fill-accent size-8"
              />
            ) : (
              <CirclePlus data-testid="member-card-button" className="size-8" />
            )}
          </Button>
        </CardContent>
      </Card>
    </article>
  );
};
