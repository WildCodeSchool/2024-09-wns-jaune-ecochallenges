import {
  Action,
  GetActionsQueryHookResult,
} from '@/lib/graphql/generated/graphql-types';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { ActionCard } from '@/components';
import { useEffect, useState } from 'react';

export const Step2Actions = ({
  actionsQuery: { data, loading, error },
}: {
  actionsQuery: GetActionsQueryHookResult;
}) => {
  const form = useFormContext();
  const [sortedActions, setSortedActions] = useState<Action[]>(
    data?.getActions || []
  );

  if (!data?.getActions) return <p>No eco-actions found</p>;
  if (loading) return <p>Chargement des actions...</p>;
  if (error)
    return <p>Erreur lors du chargement des actions : {error.message}</p>;

  useEffect(() => {
    const subscription = form.watch((value) => {
      const sortedActionsTmp = [...data?.getActions].sort((a, b) => {
        if (!value.actions) return 0;
        const isSelectedA = value.actions?.includes(a.id);
        const isSelectedB = value.actions?.includes(b.id);
        if (isSelectedA && !isSelectedB) return -1;
        if (!isSelectedA && isSelectedB) return 1;
        return 0;
      });

      setSortedActions(sortedActionsTmp);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <FormField
      control={form.control}
      name="actions"
      render={({ field }) => (
        <div className="flex flex-col flex-wrap justify-center text-center align-middle xl:flex-row">
          {sortedActions.map((action) => (
            <FormItem key={action.id}>
              <FormControl>
                <ActionCard
                  key={`action-${action.id}`}
                  action={action}
                  isSelected={field.value?.includes(action.id)}
                  onClick={() => {
                    const selectedActions = field.value || [];
                    const newValue = selectedActions.includes(action.id)
                      ? selectedActions.filter((id: string) => id !== action.id)
                      : [...selectedActions, action.id];
                    field.onChange(newValue);
                  }}
                />
              </FormControl>
            </FormItem>
          ))}
        </div>
      )}
    />
  );
};
