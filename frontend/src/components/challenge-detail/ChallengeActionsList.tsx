import {
  Action,
  UserActionChallenge,
} from '@/lib/graphql/generated/graphql-types';
import { ActionItem } from './ActionItem';

/* type ActionLite = {
  id: string;
  name: string;
  description: string;
  status: 'done' | 'pending';
  tags?: { name: string }[] | null;
}; */

type Props = {
  actions: Partial<Action>[];
  onToggleStatus: (id: string) => void;
  userActionChallenges: UserActionChallenge[];
};

export const ChallengeActionsList = ({
  actions,
  onToggleStatus,
  userActionChallenges,
}: Props) => (
  <ul className="space-y-4 bg-amber-200">
    {actions.map((action) => {
      const userAction = userActionChallenges.find(
        (userAction) => userAction.action.id === action.id
      );
      console.log('userAction', userAction);

      return (
        <ActionItem
          key={action.id}
          id={action.id || ''}
          title={action.name || ''}
          description={action.description || ''}
          tags={action.tags}
          status={userAction?.status === 'completed' ? 'done' : 'pending'}
          onToggleStatus={onToggleStatus}
        />
      );
    })}
  </ul>
);
