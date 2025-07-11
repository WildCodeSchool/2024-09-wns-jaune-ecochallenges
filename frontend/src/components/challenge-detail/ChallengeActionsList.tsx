import {
  Action,
  UserActionChallengeScore,
} from '@/lib/graphql/generated/graphql-types';
import { ActionItem } from './ActionItem';

type Props = {
  actions: Partial<Action>[];
  userActionChallengeScore: UserActionChallengeScore[];
  userId: string | undefined;
  isAuthorized: boolean | undefined;
};

export const ChallengeActionsList = ({
  actions,
  userActionChallengeScore,
  userId,
  isAuthorized,
}: Props) => {
  return (
    <ul className="space-y-4">
      {actions.map((action) => {
        const userAction = userActionChallengeScore.find(
          (userAction) => userAction?.action?.id === action.id
        );

        return (
          <ActionItem
            key={action.id}
            action={action}
            userId={userId}
            isAuthorized={isAuthorized}
            userActionChallengeScore={userAction as UserActionChallengeScore}
          />
        );
      })}
    </ul>
  );
};
