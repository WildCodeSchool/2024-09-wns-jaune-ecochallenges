import { useEffect, useState } from 'react';
import {
  useGetActionsByChallengeIdQuery,
  type Action,
} from '@/lib/graphql/generated/graphql-types';
import { ChallengeActionCard } from '@/components/challenge-detail/ChallengeActionCard';

type ActionList2Props = {
  challengeId: string;
  activeTab: 'all' | 'pending' | 'done';
};

type ActionWithStatus = Omit<Action, 'challenges'> & {
  status: 'done' | 'pending';
};

// Initialise un statut simulé pour chaque action
const initializeActionsWithStatus = (
  actions: Omit<Action, 'challenges'>[]
): ActionWithStatus[] => {
  return actions.map((action, index) => ({
    ...action,
    status: index % 2 === 0 ? 'pending' : 'done',
  }));
};

export const ChallengeActionList = ({
  challengeId,
  activeTab,
}: ActionList2Props) => {
  const { data, loading, error } = useGetActionsByChallengeIdQuery({
    variables: { challengeId },
  });

  const [actionsWithStatus, setActionsWithStatus] = useState<
    ActionWithStatus[]
  >([]);

  useEffect(() => {
    const actions = data?.getActionsByChallengeId ?? [];
    setActionsWithStatus(initializeActionsWithStatus(actions as Action[]));
  }, [data]);

  const handleToggleStatus = (id: string) => {
    setActionsWithStatus((prev) =>
      prev.map((action) =>
        action.id === id
          ? {
              ...action,
              status: action.status === 'pending' ? 'done' : 'pending',
            }
          : action
      )
    );
  };

  const filteredActions = data?.getActionsByChallengeId ?? [];

  activeTab === 'all'
    ? actionsWithStatus
    : actionsWithStatus.filter((action) => action.status === activeTab);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <ul className="flex flex-col gap-2 sm:grid sm:grid-cols-3 md:gap-3 xl:grid-cols-4 xl:gap-4">
      {filteredActions.length > 0
        ? filteredActions.map((action) => (
            <li key={action.id}>
              <ChallengeActionCard
                action={action as ActionWithStatus}
                challengeId={challengeId}
                onToggleStatus={handleToggleStatus}
              />
            </li>
          ))
        : 'Aucun éco-geste trouvé avec ces filtres'}
    </ul>
  );
};
