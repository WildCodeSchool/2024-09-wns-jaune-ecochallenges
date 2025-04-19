import {
  Action,
  useGetActionsQuery,
} from '@/lib/graphql/generated/graphql-types';
import { ActionCard, Filterbar, Filters } from '@/components';
import { useEffect, useState } from 'react';

export const ActionList = () => {
  const { data, loading, error } = useGetActionsQuery();

  const [filteredActions, setFilteredActions] = useState<
    Omit<Action, 'challenges'>[]
  >([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    tags: new Set<string>(),
    durations: new Set<number>(),
    difficulties: new Set<number>(),
  });

  useEffect(() => {
    if (!data?.getActions) return;

    const result = data.getActions.filter((action) => {
      const hasMatchingTag =
        filters.tags.size === 0 ||
        action.tags?.some((tag) => filters.tags.has(tag.name));

      const hasMatchingLevel =
        filters.difficulties.size === 0 ||
        filters.difficulties.has(action.level);

      const maxDuration = Math.max(...Array.from(filters.durations));
      const hasMatchingDuration =
        filters.durations.size === 0 || action.time <= maxDuration;

      return hasMatchingTag && hasMatchingLevel && hasMatchingDuration;
    });

    setFilteredActions(
      result.filter((action) =>
        action.name.toLowerCase().includes(filters.search.toLowerCase())
      )
    );
  }, [data?.getActions, filters]);

  if (!data?.getActions) return <p>Aucun eco-geste trouvé</p>;
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <>
      <Filterbar filters={filters} setFilters={setFilters} />
      <ul className="flex flex-col gap-1 sm:grid sm:grid-cols-3 md:gap-3 xl:grid-cols-4 xl:gap-4">
        {filteredActions.length > 0
          ? filteredActions.map((action) => (
              <li key={action.id}>
                <ActionCard action={action} />
              </li>
            ))
          : 'Aucun éco geste trouvé avec ces filtres'}
      </ul>
    </>
  );
};
