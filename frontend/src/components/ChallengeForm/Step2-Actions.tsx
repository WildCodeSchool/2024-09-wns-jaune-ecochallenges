import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAddActionsToChallengeMutation } from '@/lib/graphql/generated/graphql-types';

export const Step2Actions = ({ challengeId }: { challengeId: string }) => {
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
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

  return (
    <div className="space-y-4">
      <h2>Ajouter des éco-gestes</h2>
      {/* Replace with your action selection UI */}
      <div>
        <label>
          <input
            type="checkbox"
            value="action1"
            onChange={(e) =>
              setSelectedActions((prev) =>
                e.target.checked
                  ? [...prev, e.target.value]
                  : prev.filter((action) => action !== e.target.value)
              )
            }
          />
          Action 1
        </label>
        <label>
          <input
            type="checkbox"
            value="action2"
            onChange={(e) =>
              setSelectedActions((prev) =>
                e.target.checked
                  ? [...prev, e.target.value]
                  : prev.filter((action) => action !== e.target.value)
              )
            }
          />
          Action 2
        </label>
      </div>
      <Button onClick={handleAddActions}>Ajouter les actions</Button>
    </div>
  );
};
