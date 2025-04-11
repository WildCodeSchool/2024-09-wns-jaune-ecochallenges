import {
  Action,
  Tag,
  useGetActionsQuery,
  useGetAllTagsQuery,
} from '@/lib/graphql/generated/graphql-types';
import { ActionCard, Pill } from '@/components';
import { Input } from '@/components/ui/input';
import { Leaf, Search, Sprout, TreePalm, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useState } from 'react';

export const ActionList = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const { data, loading, error } = useGetActionsQuery();
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useGetAllTagsQuery();
  if (!data?.getActions) return <p>No eco-actions found</p>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const toggleTag = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((tag) => tag !== tagName)
        : [...prev, tagName]
    );
  };
  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const removeDifficulty = (difficulty: string) => {
    setSelectedDifficulty((prev) => prev.filter((d) => d !== difficulty));
  };
  return (
    <>
      {/*  <h1 className="items-center gap-2">
        <Sprout className="text-emerald-300" />
        <Leaf className="text-emerald-600" />
        <TreePalm className="text-emerald-800" />
      </h1> */}
      <div className="mx-auto mb-10 flex max-w-screen-md flex-col gap-3 bg-emerald-100 p-5">
        <h1>FILTER CONTAINER</h1>
        <div className="relative w-full">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
            <Search className="h-4 w-4" />
          </span>
          <Input
            type="text"
            placeholder="Rechercher..."
            className="w-full rounded-md border border-gray-300 py-2 pr-4 pl-10"
          />
        </div>
        <div className="flex flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {selectedTags.length > 0
                  ? `${selectedTags.length} tag(s) sélectionné(s)`
                  : 'Filtrer par tags'}
              </Button>
            </PopoverTrigger>
            <div className="flex flex-row flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <Button
                  onClick={() => removeTag(tag)}
                  variant="ghost"
                  key={tag}
                >
                  {tag}
                  <X className="h-4 w-4" />
                </Button>
              ))}
            </div>
            <PopoverContent className="w-64 p-0">
              <Command>
                <CommandInput placeholder="Rechercher un tag..." />
                <CommandList>
                  <CommandEmpty>Aucun tag trouvé.</CommandEmpty>
                  {tagsData?.getAllTags?.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      onSelect={() => toggleTag(tag.name)}
                      className="flex cursor-pointer justify-between"
                    >
                      {tag.name}
                      {selectedTags.includes(tag.name) && (
                        <Check className="h-4 w-4 text-emerald-500" />
                      )}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Separator orientation="vertical" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {selectedDifficulty.length > 0
                  ? `${selectedDifficulty.length} difficulté(s) sélectionnée(s)`
                  : 'Filtrer par difficulté'}
              </Button>
            </PopoverTrigger>
            <div className="flex flex-row flex-wrap gap-2">
              {selectedDifficulty.map((difficulty) => (
                <Button
                  onClick={() => removeDifficulty(difficulty)}
                  variant="ghost"
                  key={difficulty}
                >
                  {difficulty}
                  <X className="h-4 w-4" />
                </Button>
              ))}
            </div>
            <PopoverContent className="w-64 p-0">
              <Command>
                <CommandInput placeholder="difficulté" />
                <CommandList>
                  <CommandEmpty>Aucun tag trouvé.</CommandEmpty>
                  {tagsData?.getAllTags?.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      onSelect={() => toggleTag(tag.name)}
                      className="flex cursor-pointer justify-between"
                    >
                      {tag.name}
                      {selectedTags.includes(tag.name) && (
                        <Check className="h-4 w-4 text-emerald-500" />
                      )}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:flex-wrap lg:justify-center">
        {data.getActions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>
    </>
  );
};
