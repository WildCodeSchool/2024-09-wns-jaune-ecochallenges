import {
  Action,
  UserActionChallengeScore,
} from '@/lib/graphql/generated/graphql-types';
import { ActionItem } from './ActionItem';

type Props = {
  actions: Partial<Action>[];
  userActionChallengeScore: UserActionChallengeScore[];
  userId: string | undefined;
  isChallengeMember: boolean | undefined;
};

export const ChallengeActionsList = ({
  actions,
  userActionChallengeScore,
  userId,
  isChallengeMember,
}: Props) => {
  return (
    <ul className="space-y-4">
      {actions.map((action) => {
        const userAction = userActionChallengeScore.find(
          (userAction) =>
            userAction?.validatedFor?.id === userId &&
            userAction?.action?.id === action.id
        );

        return (
          <ActionItem
            key={action.id}
            action={action}
            userId={userId}
            isChallengeMember={isChallengeMember}
            userActionChallengeScore={userAction as UserActionChallengeScore}
          />
        );
      })}
    </ul>
  );
};
