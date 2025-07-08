import { ActionCard, Filterbar } from '@/components';
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
  useGetUserActionsQuery,
  GetUserActionsQuery,
} from '@/lib/graphql/generated/graphql-types';
import { CircleCheck, CirclePlus, CircleX, Trash } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const Step2Actions = () => {
  const form = useFormContext();
  const { data, loading, error } = useGetUserActionsQuery();
  const selectedActionIds = form.watch('actions') || [];

  const [filteredAvailableActions, setFilteredAvailableActions] = useState<
    GetUserActionsQuery['getUserActions']
  >([]);

  const selectedActions = useMemo(
    () =>
      data?.getUserActions.filter((action) =>
        selectedActionIds.includes(action.id)
      ),
    [data?.getUserActions, selectedActionIds]
  );

  const availableActions = useMemo(
    () =>
      data?.getUserActions.filter(
        (action) => !selectedActionIds.includes(action.id)
      ),
    [data?.getUserActions, selectedActionIds]
  );

  const handleActionClick = (
    action: GetUserActionsQuery['getUserActions'][number],
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

  if (!data?.getUserActions) return <p role="alert">Aucun éco-gestes trouvé</p>;
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

  return (
    <>
      <Filterbar
        data={availableActions ?? []}
        setData={setFilteredAvailableActions}
      />

      <FormField
        control={form.control}
        name="actions"
        render={() => (
          <Accordion type="multiple" defaultValue={['selected', 'available']}>
            <AccordionItem value="selected" disabled={!selectedActions?.length}>
              <div className="relative">
                <AccordionTrigger>
                  <div className="flex items-center gap-2 uppercase">
                    {selectedActions?.length ? (
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

                {selectedActions?.length && (
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
            </AccordionItem>

            <AccordionItem value="available">
              <AccordionTrigger>
                <div className="flex items-center gap-2 uppercase">
                  <CirclePlus aria-hidden="true" />
                  <span>Ajouter des actions</span>
                </div>
              </AccordionTrigger>

              {selectedActions?.length && (
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
              {/* </div> */}

              {selectedActions?.length && (
                <AccordionContent className="flex flex-col gap-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-4">
                  {selectedActions.map((action) => (
                    <FormItem key={action.id}>
                      <FormControl>
                        <div className="max-w-full overflow-hidden">
                          <ActionCard
                            action={action}
                            isSelected={true}
                            onClick={() => handleActionClick(action, true)}
                          />
                        </div>
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

              <AccordionContent className="flex flex-col gap-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-4">
                {filteredAvailableActions?.map((action) => (
                  <FormItem key={action.id}>
                    <FormControl>
                      <div className="max-w-full overflow-hidden">
                        <ActionCard
                          action={action}
                          isSelected={false}
                          onClick={() => handleActionClick(action, false)}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      />
    </>
  );
};
