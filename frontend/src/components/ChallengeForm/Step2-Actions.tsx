import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  useAddActionsToChallengeMutation,
  useGetActionsQuery,
} from '@/lib/graphql/generated/graphql-types';

export const Step2Actions = ({ challengeId }: { challengeId: string }) => {
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const { data, loading, error } = useGetActionsQuery();
  const [addActionsToChallenge] = useAddActionsToChallengeMutation();

  const handleAddActions = async () => {
    try {
      const response = await addActionsToChallenge({
        variables: {
          challengeId,
          actions: selectedActions,
        },
      });
      console.log('Actions ajoutées avec succès :', response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout des actions :", error);
    }
  };

  if (loading) return <p>Chargement des actions...</p>;
  if (error)
    return <p>Erreur lors du chargement des actions : {error.message}</p>;

  return (
    <div className="space-y-4">
      <h2>Ajouter des éco-gestes</h2>
      <div>
        {data?.getActions.map((action) => (
          <label key={action.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={action.id}
              onChange={(e) =>
                setSelectedActions((prev) =>
                  e.target.checked
                    ? [...prev, e.target.value]
                    : prev.filter((id) => id !== e.target.value)
                )
              }
            />
            <span>{action.name}</span>
          </label>
        ))}
      </div>
      <Button onClick={handleAddActions}>Ajouter les actions</Button>
    </div>
  );
};
