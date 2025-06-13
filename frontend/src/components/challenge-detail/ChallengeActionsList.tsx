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
  userActionChallenges: Partial<UserActionChallenge>[]; // <--- ici
};

export const ChallengeActionsList = ({
  actions,
  onToggleStatus,
  userActionChallenges,
}: Props) => {
  const totoId = userActionChallenges[0]?.user?.id;

  return (
    <ul className="space-y-4 bg-amber-200">
      {actions.map((action) => {
        const userAction = userActionChallenges.find(
          (userAction) => userAction.action?.id === action.id
        );

        const status = userAction?.status === 'completed' ? 'done' : 'pending';

        return (
          <ActionItem
            key={action.id}
            id={action.id || ''}
            title={action.name || ''}
            description={action.description || ''}
            tags={action.tags}
            status={status}
            userId={totoId}
            onToggleStatus={onToggleStatus}
          />
        );
      })}
    </ul>
  );
};
