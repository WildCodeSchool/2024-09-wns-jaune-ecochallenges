import { User } from '@/lib/graphql/generated/graphql-types';

export const UserCard = ({
  user,
  isSelected = false,
  onClick,
}: {
  user: User;
}) => {
  return (
    <p>
      {user?.firstname} {user?.lastname};
    </p>
  );
};
