import {
  useGetActionsQuery,
  useGetAllTagsQuery,
} from '@/lib/graphql/generated/graphql-types';
import { ActionCard } from '@/components';
import { Input } from '@/components/ui/input';
import { Leaf, Search, Sprout, TreePalm, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ActionList = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<number[]>([]);
  useEffect(() => {
    console.log(selectedTags);
    console.log(selectedDifficulty);
    console.log(selectedDurations);
  }, [selectedTags, selectedDurations, selectedDifficulty]);

  const { data, loading, error } = useGetActionsQuery();
  const { data: tagsData } = useGetAllTagsQuery();

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

  const toggleDifficulty = (difficulty: number) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };
  const removeDifficulty = (difficulty: number) => {
    setSelectedDifficulty((prev) => prev.filter((d) => d !== difficulty));
  };

  const toggleDuration = (duration: number) => {
    setSelectedDurations((prev) =>
      prev.includes(duration)
        ? prev.filter((d) => d !== duration)
        : [...prev, duration]
    );
  };
  const removeDuration = (duration: number) => {
    setSelectedDurations((prev) => prev.filter((d) => d !== duration));
  };

  const difficulties = [
    {
      value: 1,
      label: 'Facile',
      icon: <Sprout className="text-primary/30" />,
    },
    {
      value: 2,
      label: 'Moyen',
      icon: <Leaf className="text-primary/60" />,
    },
    {
      value: 3,
      label: 'Difficile',
      icon: <TreePalm className="text-primary" />,
    },
  ];
  const durations = [
    {
      value: 2,
      label: '2 heures ou moins',
    },
    {
      value: 4,
      label: '4 heures ou moins',
    },
    {
      value: 6,
      label: '6 heures ou moins',
    },
    {
      value: 8,
      label: '8 heures ou moins',
    },
  ];

  return (
    <>
      <div className="mx-auto mb-10 flex max-w-screen-md flex-col gap-3 bg-emerald-100 p-5">
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
          {/* tag */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {selectedTags.length > 0
                  ? `${selectedTags.length} tag(s) sélectionné(s)`
                  : 'Filtrer par tags'}
              </Button>
            </PopoverTrigger>

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
          {/* difficulty */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {selectedDifficulty.length > 0
                  ? `${selectedDifficulty.length} difficulté(s) sélectionnée(s)`
                  : 'Filtrer par difficulté'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <Command>
                <CommandInput placeholder="difficulté" />
                <CommandList>
                  <CommandEmpty>Aucun tag trouvé.</CommandEmpty>

                  {difficulties.map((difficulty) => (
                    <CommandItem
                      key={difficulty.value}
                      onSelect={() => toggleDifficulty(difficulty.value)}
                      className="justify-left flex cursor-pointer"
                    >
                      {difficulty.label} {difficulty.icon}
                      {selectedDifficulty.includes(difficulty.value) && (
                        <Check className="h-4 w-4 text-emerald-500" />
                      )}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Separator orientation="vertical" />
          {/* Durée */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {selectedDifficulty.length > 0
                  ? `${selectedDifficulty.length} durée(s) sélectionnée(s)`
                  : 'Filtrer par durée'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <Command>
                <CommandInput placeholder="durée" />
                <CommandList>
                  <CommandEmpty>Aucun tag trouvé.</CommandEmpty>

                  {durations.map((duration) => (
                    <CommandItem
                      key={duration.value}
                      onSelect={() => toggleDuration(duration.value)}
                      className="justify-left flex cursor-pointer"
                    >
                      {duration.label}
                      {selectedDurations.includes(duration.value) && (
                        <Check className="h-4 w-4 text-emerald-500" />
                      )}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-row gap-2">
          {selectedTags.map((tag) => (
            <Button onClick={() => removeTag(tag)} variant="ghost" key={tag}>
              {tag}
              <X className="h-4 w-4" />
            </Button>
          ))}

          {selectedDifficulty.map((difficulty) => (
            <Button
              onClick={() => removeDifficulty(difficulty)}
              variant="ghost"
              key={difficulty}
            >
              {difficulties.find((d) => d.value === difficulty)?.label}
              <X className="h-4 w-4" />
            </Button>
          ))}

          {selectedDurations.map((duration) => (
            <Button
              onClick={() => removeDuration(duration)}
              variant="ghost"
              key={duration}
            >
              {durations.find((d) => d.value === duration)?.label}
              <X className="h-4 w-4" />
            </Button>
          ))}
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
