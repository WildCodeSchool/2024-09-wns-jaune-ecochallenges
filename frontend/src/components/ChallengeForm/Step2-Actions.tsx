import { useEffect } from 'react';
import { GetActionsQueryHookResult } from '@/lib/graphql/generated/graphql-types';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormContext } from 'react-hook-form';

export const Step2Actions = ({
  challengeId,
  actionsQuery,
}: {
  challengeId: string;
  actionsQuery: GetActionsQueryHookResult;
}) => {
  const { data, loading, error } = actionsQuery;
  // const [addActionsToChallenge] = useAddActionsToChallengeMutation();
  const form = useFormContext();

  // Afficher les valeurs actuelles du formulaire à chaque rendu
  useEffect(() => {
    console.log('Valeurs du formulaire:', form.getValues());
  }, [form]);

  // const handleAddActions = async () => {
  //   try {
  //     const selectedActions = form.getValues('actions') || [];
  //     console.log('Actions sélectionnées:', selectedActions);

  //     const response = await addActionsToChallenge({
  //       variables: {
  //         challengeId,
  //         actions: selectedActions,
  //       },
  //     });
  //     console.log('Actions ajoutées avec succès :', response.data);
  //   } catch (error) {
  //     console.error("Erreur lors de l'ajout des actions :", error);
  //   }
  // };

  if (!data?.getActions) return <p>No eco-actions found</p>;
  if (loading) return <p>Chargement des actions...</p>;
  if (error)
    return <p>Erreur lors du chargement des actions : {error.message}</p>;

  return (
    <>
      {/* <div className="space-y-4">
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
      </div> */}

      <FormField
        control={form.control}
        name="actions"
        render={({ field }) => (
          <div className="space-y-4">
            {data?.getActions.map((action) => (
              <FormItem key={action.id} className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(action.id)}
                    onCheckedChange={(checked) => {
                      const selectedActions = field.value || [];
                      const newValue = checked
                        ? [...selectedActions, action.id]
                        : selectedActions.filter(
                            (id: string) => id !== action.id
                          );
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>
                <FormLabel>{action.name}</FormLabel>
              </FormItem>
            ))}
          </div>
        )}
      />
    </>
  );
};
