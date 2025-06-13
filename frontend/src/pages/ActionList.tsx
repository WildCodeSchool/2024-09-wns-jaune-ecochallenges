import {
  Action,
  useDeleteActionMutation,
  useGetUserActionsQuery,
} from '@/lib/graphql/generated/graphql-types';
import { ActionCard, Filterbar, Filters } from '@/components';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from '@/components/ui';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useUserStore } from '@/lib/zustand/userStore';
import { GET_ACTIONS } from '@/lib/graphql/operations';
import { toast } from 'sonner';

export const ActionList = () => {
  const { data, loading, error } = useGetUserActionsQuery();

  const [filteredActions, setFilteredActions] = useState<
    Omit<Action, 'challenges'>[]
  >([]);

  const [filters, setFilters] = useState<Filters>({
    search: '',
    tags: new Set<string>(),
    durations: new Set<number>(),
    difficulties: new Set<number>(),
  });

  const [deleteAction] = useDeleteActionMutation({
    refetchQueries: [
      {
        query: GET_ACTIONS,
      },
    ],
    onCompleted: () => {
      window.location.reload();
    },
  });

  const handleDeleteAction = async (id: string) => {
    try {
      await deleteAction({ variables: { id } });
      toast.success('Eco-geste supprimé avec succès');
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'éco-geste");
    }
  };

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!data?.getUserActions) return;

    const result = data.getUserActions.filter((action) => {
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
  }, [data?.getUserActions, filters]);

  if (!data?.getUserActions) return <p>Aucun eco-geste trouvé</p>;
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  const publicActions = filteredActions.filter(
    (action) => action.createdBy?.role === 'admin'
  );
  const privateActions = filteredActions.filter(
    (action) => action.createdBy?.role !== 'admin'
  );
  return (
    <>
      <Filterbar filters={filters} setFilters={setFilters} />

      <Accordion type="multiple" defaultValue={['public', 'private']}>
        <AccordionItem value="public">
          <AccordionTrigger disabled={publicActions.length === 0}>
            🌱 Eco-gestes publics
          </AccordionTrigger>
          {publicActions.length > 0 && (
            <AccordionContent>
              <ul className="flex flex-col gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-4">
                {publicActions.map((action) => (
                  <li key={action.id}>
                    <ActionCard
                      action={action}
                      onDelete={() => handleDeleteAction(action.id)}
                      user={user ?? undefined}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          )}
          {publicActions.length === 0 && (
            <AccordionContent>
              <p>Aucun éco-geste public trouvé</p>
            </AccordionContent>
          )}
        </AccordionItem>

        <AccordionItem value="private">
          <AccordionTrigger disabled={privateActions.length === 0}>
            👤 Mes éco-gestes
          </AccordionTrigger>
          {privateActions.length > 0 && (
            <AccordionContent>
              <ul className="flex flex-col gap-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-4">
                {privateActions.map((action) => (
                  <li key={action.id}>
                    <ActionCard
                      action={action}
                      onDelete={() => handleDeleteAction(action.id)}
                      user={user ?? undefined}
                    />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          )}
          {privateActions.length === 0 && (
            <AccordionContent>
              <p>Aucun éco-geste personnel trouvé</p>
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>

      {user && (
        <Button
          asChild
          variant="default"
          className="fixed right-4 bottom-8 z-50 size-14 rounded-full shadow-md shadow-black/50"
        >
          <Link to="/action/new">
            <Plus className="size-10" strokeWidth={1.4} />
          </Link>
        </Button>
      )}
    </>
  );
};
