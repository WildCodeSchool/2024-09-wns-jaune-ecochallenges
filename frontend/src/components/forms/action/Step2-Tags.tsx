import { TagCard } from '@/components/TagCard';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { useGetAllTagsQuery } from '@/lib/graphql/generated/graphql-types';
import { useFormContext } from 'react-hook-form';

export const Step2Tags = () => {
  const form = useFormContext();
  const { data, loading, error } = useGetAllTagsQuery();

  if (loading)
    return (
      <p role="status" aria-busy="true">
        Chargement des tags ...
      </p>
    );
  if (error)
    return (
      <p role="alert">Erreur lors du chargement des tags : {error.message}</p>
    );
  return (
    <FormField
      control={form.control}
      name="members"
      render={() => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <div className="grid grid-cols-2 gap-4">
              {data?.getAllTags.map((tag) => (
                <TagCard tag={tag} isSelected={false} onClick={() => {}} />
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
