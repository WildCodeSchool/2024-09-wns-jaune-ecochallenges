import { ActionCard } from '@/components';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui';
import {
  Action,
  GetActionsQueryHookResult,
} from '@/lib/graphql/generated/graphql-types';
import { CircleCheck, CirclePlus, CircleX, Trash } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export const Step2Actions = ({
  actionsQuery: { data, loading, error },
}: {
  actionsQuery: GetActionsQueryHookResult;
}) => {
  const form = useFormContext();
  const selectedActionIds = form.watch('actions') || [];

  if (!data?.getActions) return <p role="alert">Aucun éco-gestes trouvé</p>;
  if (loading)
    return (
      <p role="status" aria-busy="true">
        Chargement des éco-gestes...
      </p>
    );
  if (error)
    return (
      <p role="alert">
        Erreur lors du chargement des éco-gestes : {error.message}
      </p>
    );

  const selectedActions = data.getActions.filter((action) =>
    selectedActionIds.includes(action.id)
  );

  const availableActions = data.getActions.filter(
    (action) => !selectedActionIds.includes(action.id)
  );

  const handleActionClick = (
    action: Omit<Action, 'challenges'>,
    isSelected: boolean
  ) => {
    const newValue = isSelected
      ? selectedActionIds.filter((id: string) => id !== action.id)
      : [...selectedActionIds, action.id];
    form.setValue('actions', newValue, { shouldValidate: true });
  };

  const clearSelectedActions = () => {
    form.setValue('actions', [], { shouldValidate: true });
  };

  return (
    <FormField
      control={form.control}
      name="actions"
      render={() => (
        <Accordion type="multiple" defaultValue={['selected', 'available']}>
          <AccordionItem
            value="selected"
            disabled={selectedActions.length === 0}
          >
            <div className="relative">
              <AccordionTrigger>
                <div className="flex items-center gap-2 uppercase">
                  {selectedActions.length > 0 ? (
                    <>
                      <CircleCheck aria-hidden="true" />
                      <span>Actions sélectionnées : </span>
                      <span
                        className="font-bold"
                        aria-label="Nombre d'actions sélectionnées"
                      >
                        {selectedActions.length}
                      </span>
                    </>
                  ) : (
                    <>
                      <CircleX aria-hidden="true" />
                      <span>Aucune action sélectionnée</span>
                    </>
                  )}
                </div>
              </AccordionTrigger>

              {selectedActions.length > 0 && (
                <Button
                  variant="destructive"
                  className="absolute top-3 right-8"
                  size="sm"
                  type="button"
                  onClick={clearSelectedActions}
                  aria-label="Supprimer toutes les actions sélectionnées"
                >
                  <Trash aria-hidden="true" />
                </Button>
              )}
            </div>

            {selectedActions.length > 0 && (
              <AccordionContent className="flex flex-col flex-wrap items-center justify-center gap-4 text-center xl:flex-row">
                {selectedActions.map((action) => (
                  <FormItem key={action.id}>
                    <FormControl>
                      <ActionCard
                        action={action}
                        isSelected={true}
                        onClick={() => handleActionClick(action, true)}
                      />
                    </FormControl>
                  </FormItem>
                ))}
              </AccordionContent>
            )}
          </AccordionItem>

          <AccordionItem value="available">
            <AccordionTrigger>
              <div className="flex items-center gap-2 uppercase">
                <CirclePlus aria-hidden="true" />
                <span>Ajouter des actions</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col flex-wrap items-center justify-center gap-4 text-center xl:flex-row">
              {availableActions.map((action) => (
                <FormItem key={action.id}>
                  <FormControl>
                    <ActionCard
                      action={action}
                      isSelected={false}
                      onClick={() => handleActionClick(action, false)}
                    />
                  </FormControl>
                </FormItem>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    />
  );
};
