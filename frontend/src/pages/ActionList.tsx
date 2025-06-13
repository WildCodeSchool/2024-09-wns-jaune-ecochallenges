import {
  useDeleteActionMutation,
  useGetUserActionsQuery,
  GetUserActionsQuery,
} from '@/lib/graphql/generated/graphql-types';
import { ActionCard, Filterbar } from '@/components';
import { useState } from 'react';
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
  const user = useUserStore((state) => state.user);

  const { data, loading, error } = useGetUserActionsQuery();
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

  const [filteredActions, setFilteredActions] = useState<
    GetUserActionsQuery['getUserActions']
  >([]);

  const handleDeleteAction = async (id: string) => {
    try {
      await deleteAction({ variables: { id } });
      toast.success('Eco-geste supprimé avec succès');
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'éco-geste");
    }
  };

  const publicActions = filteredActions.filter(
    (action) => action.createdBy?.role === 'admin'
  );
  const privateActions = filteredActions.filter(
    (action) => action.createdBy?.role !== 'admin'
  );

  if (!data?.getUserActions) return <p>Aucun eco-geste trouvé</p>;
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <>
      <Filterbar data={data.getUserActions} setData={setFilteredActions} />

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
