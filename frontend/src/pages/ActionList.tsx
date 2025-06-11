import {
  Action,
  useGetActionsQuery,
} from '@/lib/graphql/generated/graphql-types';
import { ActionCard, Filterbar, Filters } from '@/components';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useUserStore } from '@/lib/zustand/userStore';

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

  const user = useUserStore((state) => state.user);

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
      ) as Omit<Action, 'challenges'>[]
    );
  }, [data?.getActions, filters]);

  if (!data?.getActions) return <p>Aucun eco-geste trouvé</p>;
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  const publicActions = filteredActions.filter(
    (action) => action.createdBy?.role === 'admin'
  );
  const privateActions = filteredActions.filter(
    (action) => action.createdBy?.id === user?.id
  );
  return (
    <>
      <Filterbar filters={filters} setFilters={setFilters} />

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-bold">Eco-gestes publics</h2>
        <ul className="flex flex-col gap-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-4">
          {publicActions.length > 0 ? (
            publicActions.map((action) => (
              <li key={action.id}>
                <ActionCard action={action} />
              </li>
            ))
          ) : (
            <li>Aucun éco-geste public trouvé avec ces filtres</li>
          )}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-bold">Mes éco-gestes</h2>
        <ul className="flex flex-col gap-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-4">
          {privateActions.length > 0 ? (
            privateActions.map((action) => (
              <li key={action.id}>
                <ActionCard action={action} />
              </li>
            ))
          ) : (
            <li>Aucun éco-geste personnel trouvé avec ces filtres</li>
          )}
        </ul>
      </section>

      <Button
        asChild
        variant="default"
        className="fixed right-4 bottom-20 z-50 size-14 rounded-full shadow-md shadow-black/50"
      >
        <Link to="/action/new">
          <Plus className="size-10" strokeWidth={1.4} />
        </Link>
      </Button>
    </>
  );
};
