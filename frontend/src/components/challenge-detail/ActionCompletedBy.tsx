import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/lib/graphql/generated/graphql-types';

export const ActionCompletedBy = ({
  completedBy,
}: {
  maxLength: number;
  completedBy: User;
}) => {
  return (
    <div className="flex">
      <Avatar key={completedBy.id} className="-mr-2">
        <AvatarImage src={completedBy?.avatarUrl || ''} alt="user avatar" />
        <AvatarFallback>
          {completedBy?.firstname?.slice(0, 1).toUpperCase()}{' '}
          {completedBy?.lastname?.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
