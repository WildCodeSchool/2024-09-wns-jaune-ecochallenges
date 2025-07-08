import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserActionChallenge } from '@/lib/graphql/generated/graphql-types';

export const ActionCompletedBy = ({
  maxLength,
  completedBy,
}: {
  maxLength: number;
  completedBy: Partial<UserActionChallenge>[];
}) => {
  const sortedCompletedBy = completedBy.sort((a, b) =>
    a?.createdAt.localeCompare(b?.createdAt)
  );

  return (
    <div className="flex">
      {sortedCompletedBy.slice(0, maxLength).map((user) => (
        <Avatar key={user.user?.id} className="-mr-2">
          <AvatarImage src={user.user?.avatarUrl || ''} alt="user avatar" />
          <AvatarFallback>{user.user?.firstname.slice(0, 1)}</AvatarFallback>
        </Avatar>
      ))}
      {sortedCompletedBy.length > maxLength && (
        <Avatar>
          <AvatarFallback>
            +{sortedCompletedBy.length - maxLength}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
