import { Leaf, Search, Sprout, TreePalm, X } from 'lucide-react';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from './ui/command';
import { Check } from 'lucide-react';
import { useGetAllTagsQuery } from '@/lib/graphql/generated/graphql-types';

type Filters = {
  search: string;
  selectedTags: string[];
  selectedDurations: number[];
  selectedDifficulty: number[];
};

interface FilterBarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const Filterbar = ({ filters, setFilters }: FilterBarProps) => {
  const { data: tagsData } = useGetAllTagsQuery();

  const toggleTag = (tagName: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagName)
        ? prev.selectedTags.filter((tag) => tag !== tagName)
        : [...prev.selectedTags, tagName],
    }));
  };

  const removeTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.filter((t) => t !== tag),
    }));
  };

  const toggleDifficulty = (difficulty: number) => {
    setFilters((prev) => ({
      ...prev,
      selectedDifficulty: prev.selectedDifficulty.includes(difficulty)
        ? prev.selectedDifficulty.filter((d) => d !== difficulty)
        : [...prev.selectedDifficulty, difficulty],
    }));
  };
  const removeDifficulty = (difficulty: number) => {
    setFilters((prev) => ({
      ...prev,
      selectedDifficulty: prev.selectedDifficulty.filter(
        (d) => d !== difficulty
      ),
    }));
  };

  const toggleDuration = (duration: number) => {
    setFilters((prev) => ({
      ...prev,
      selectedDurations: prev.selectedDurations.includes(duration)
        ? prev.selectedDurations.filter((d) => d !== duration)
        : [...prev.selectedDurations, duration],
    }));
  };
  const removeDuration = (duration: number) => {
    setFilters((prev) => ({
      ...prev,
      selectedDurations: prev.selectedDurations.filter((d) => d !== duration),
    }));
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
      icon: <Leaf className="text-primary/60 h-4 w-4" />,
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

  const resetFilter = () => {
    setFilters({
      search: '',
      selectedTags: [],
      selectedDurations: [],
      selectedDifficulty: [],
    });
  };

  return (
    <div className="mx-auto mb-10 flex max-w-screen-lg flex-col gap-3 p-5">
      <div className="relative w-full">
        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
          <Search className="h-4 w-4" />
        </span>
        <Input
          type="text"
          placeholder="Rechercher..."
          className="w-full rounded-md border border-gray-300 py-2 pr-4 pl-10"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="flex flex-row flex-wrap gap-2">
        {/* tag */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {filters.selectedTags.length > 0
                ? `${filters.selectedTags.length} tag(s) sélectionné(s)`
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
                    {filters.selectedTags.includes(tag.name) && (
                      <Check className="h-4 w-4 text-emerald-500" />
                    )}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* difficulty */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {filters.selectedDifficulty.length > 0
                ? `${filters.selectedDifficulty.length} difficulté(s) sélectionnée(s)`
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
                    {filters.selectedDifficulty.includes(difficulty.value) && (
                      <Check className="h-4 w-4 text-emerald-500" />
                    )}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Durée */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {filters.selectedDurations.length > 0
                ? `${filters.selectedDurations.length} durée(s) sélectionnée(s)`
                : 'Filtrer par durée'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0">
            <Command>
              <CommandInput placeholder="durée" />
              <CommandList>
                <CommandEmpty>Aucune durée trouvée.</CommandEmpty>

                {durations.map((duration) => (
                  <CommandItem
                    key={duration.value}
                    onSelect={() => toggleDuration(duration.value)}
                    className="justify-left flex cursor-pointer"
                  >
                    {duration.label}
                    {filters.selectedDurations.includes(duration.value) && (
                      <Check className="h-4 w-4 text-emerald-500" />
                    )}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {filters.selectedTags.length ||
        filters.selectedDifficulty.length ||
        filters.selectedDurations.length ? (
          <Button onClick={resetFilter} size="sm" variant="link">
            Réinitialiser
          </Button>
        ) : null}
      </div>
      <div className="flex flex-row gap-2">
        {filters.selectedTags.map((tag) => (
          <Button onClick={() => removeTag(tag)} variant="ghost" key={tag}>
            {tag}
            <X className="h-4 w-4" />
          </Button>
        ))}

        {filters.selectedDifficulty.map((difficulty) => (
          <Button
            onClick={() => removeDifficulty(difficulty)}
            variant="ghost"
            key={difficulty}
          >
            {difficulties.find((d) => d.value === difficulty)?.label}
            <X className="h-4 w-4" />
          </Button>
        ))}

        {filters.selectedDurations.map((duration) => (
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
  );
};
