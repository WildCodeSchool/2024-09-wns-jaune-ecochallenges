import { TagCard } from '@/components/TagCard';
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
import { Tag, useGetAllTagsQuery } from '@/lib/graphql/generated/graphql-types';
import { CircleCheck, CirclePlus, CircleX, Trash } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export const Step2Tags = () => {
  const form = useFormContext();
  const { data, loading, error } = useGetAllTagsQuery();
  const selectedTagsId = form.watch('tags') || [];

  if (!data?.getAllTags) return <p role="alert">Aucun tag trouvé</p>;
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

  const selectedTags = data.getAllTags.filter((tag) =>
    selectedTagsId.includes(tag.id)
  );

  const availableTags = data.getAllTags.filter(
    (tag) => !selectedTagsId.includes(tag.id)
  );

  const handleTagClick = (tag: Tag, isSelected: boolean) => {
    const newValue = isSelected
      ? selectedTagsId.filter((id: string) => id !== tag.id)
      : [...selectedTagsId, tag.id];
    form.setValue('tags', newValue, { shouldValidate: true });
  };

  const clearSelectedTags = () => {
    form.setValue('tags', [], { shouldValidate: true });
  };
  return (
    <FormField
      control={form.control}
      name="tags"
      render={() => (
        <Accordion type="multiple" defaultValue={['selected', 'available']}>
          <AccordionItem value="selected" disabled={selectedTags.length === 0}>
            <div className="relative">
              <AccordionTrigger>
                <div className="flex items-center gap-2 uppercase">
                  {selectedTags.length > 0 ? (
                    <>
                      <CircleCheck aria-hidden="true" />
                      <span>Tags sélectionnés : </span>
                      <span
                        className="font-bold"
                        aria-label="Nombre de tags sélectionnés"
                      >
                        {selectedTags.length}
                      </span>
                    </>
                  ) : (
                    <>
                      <CircleX aria-hidden="true" />
                      <span>Aucun tag sélectionné</span>
                    </>
                  )}
                </div>
              </AccordionTrigger>
              {selectedTags.length > 0 && (
                <Button
                  variant="destructive"
                  className="absolute top-3 right-8"
                  size="sm"
                  type="button"
                  onClick={clearSelectedTags}
                  aria-label="Supprimer tous les tags sélectionnés"
                >
                  <Trash aria-hidden="true" />
                </Button>
              )}
            </div>
            {selectedTags.length > 0 && (
              <AccordionContent className="flex flex-col gap-1 sm:grid sm:grid-cols-3 md:gap-3 xl:grid-cols-4 xl:gap-4">
                {selectedTags.map((tag) => (
                  <FormItem key={tag.id}>
                    <FormControl>
                      <TagCard
                        tag={tag}
                        isSelected={true}
                        onClick={() => handleTagClick(tag, true)}
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
                <span>Ajouter des tags</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1 sm:grid sm:grid-cols-3 md:gap-3 xl:grid-cols-4 xl:gap-4">
              {availableTags.map((tag) => (
                <FormItem key={tag.id}>
                  <FormControl>
                    <TagCard
                      tag={tag}
                      isSelected={false}
                      onClick={() => handleTagClick(tag, false)}
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
