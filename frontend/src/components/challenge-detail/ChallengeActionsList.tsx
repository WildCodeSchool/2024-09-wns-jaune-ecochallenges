import {
  Action,
  UserActionChallenge,
} from '@/lib/graphql/generated/graphql-types';
import { ActionItem } from './ActionItem';
import { StatusEnum } from '@/lib/enums';

type Props = {
  actions: Partial<Action>[];
  userActionChallenges: Partial<UserActionChallenge>[];
  userId: string | undefined;
  isAuthorized: boolean | undefined;
};

export const ChallengeActionsList = ({
  actions,
  userActionChallenges,
  userId,
  isAuthorized,
}: Props) => {
  return (
    <ul className="space-y-4">
      {actions.map((action) => {
        const userAction = userActionChallenges.find(
          (userAction) =>
            userAction?.action?.id === action.id &&
            userAction.user?.id === userId
        );

        const completedBy = userActionChallenges.filter(
          (userAction) => userAction?.action?.id === action.id
        );

        const status =
          userAction?.status === StatusEnum.COMPLETED
            ? StatusEnum.COMPLETED
            : StatusEnum.PENDING;

        return (
          <ActionItem
            key={action.id}
            status={status}
            action={action}
            userId={userId}
            isAuthorized={isAuthorized}
            completedBy={completedBy}
          />
        );
      })}
    </ul>
  );
};
