import {
  Action,
  useGetActionsQuery,
} from '@/lib/graphql/generated/graphql-types';
import { ActionCard } from '@/components';
import { useEffect, useState } from 'react';
import { Filterbar } from '@/components/Filterbar';

export const ActionList = () => {
  const [filters, setFilters] = useState<{
    selectedTags: string[];
    selectedDifficulty: number[];
    selectedDurations: number[];
    search: string;
  }>({
    selectedTags: [],
    selectedDifficulty: [],
    selectedDurations: [],
    search: '',
  });

  const [actions, setActions] = useState<Action[]>([]);
  const [filteredActions, setFilteredActions] = useState<Action[]>([]);
  useEffect(() => {
    const result = actions.filter((action: Action) => {
      const hasMatchingTag =
        filters.selectedTags.length === 0 ||
        action.tags?.some((tag) => filters.selectedTags.includes(tag.name));

      const hasMatchingLevel =
        filters.selectedDifficulty.length === 0 ||
        filters.selectedDifficulty.includes(action.level);

      const maxDuration = Math.max(...filters.selectedDurations);
      const hasMatchingDuration =
        filters.selectedDurations.length === 0 || action.time <= maxDuration;

      return hasMatchingTag && hasMatchingLevel && hasMatchingDuration;
    });
    setFilteredActions(
      result.filter((action) =>
        action.name.toLowerCase().includes(filters.search)
      )
    );
  }, [actions, filters]);

  const { data, loading, error } = useGetActionsQuery({
    onCompleted: (data) => {
      setActions(data.getActions);
    },
  });

  if (!data?.getActions) return <p>Aucun eco-geste trouvé</p>;
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <>
      <Filterbar filters={filters} setFilters={setFilters} />
      <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:flex-wrap lg:justify-center">
        {filteredActions.length > 0
          ? filteredActions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))
          : 'Aucun éco geste trouvé avec ces filtres'}
      </div>
    </>
  );
};
