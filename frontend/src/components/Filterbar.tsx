import { useEffect, useState } from 'react';
import { Check, Leaf, Search, Sprout, TreePalm, X } from 'lucide-react';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from '@/components/ui';
import {
  useGetAllTagsQuery,
  GetUserActionsQuery,
} from '@/lib/graphql/generated/graphql-types';

export type Filters = {
  search: string;
  tags: Set<string>;
  durations: Set<number>;
  difficulties: Set<number>;
};

type FiltersWithTypes = {
  tags: string;
  difficulties: number;
  durations: number;
};

const difficulties = [
  {
    value: 1,
    label: 'Facile',
    icon: Sprout,
    className: 'text-primary/30',
  },
  {
    value: 2,
    label: 'Moyen',
    icon: Leaf,
    className: 'text-primary/60 h-4 w-4',
  },
  {
    value: 3,
    label: 'Difficile',
    icon: TreePalm,
    className: 'text-primary',
  },
] as const;

const durations = [2, 4, 6, 8] as const;
const getDurationLabel = (duration: number) => `≤ ${duration} heures`;

const initialFilters = {
  search: '',
  tags: new Set<string>(),
  durations: new Set<number>(),
  difficulties: new Set<number>(),
};

export const Filterbar = ({
  data,
  setData,
}: {
  data: GetUserActionsQuery['getUserActions'];
  setData: (data: GetUserActionsQuery['getUserActions']) => void;
}) => {
  const { data: tagsData } = useGetAllTagsQuery();

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleResetFilters = () => {
    filterData(initialFilters);
  };

  const handleSearch = (search: string) => {
    filterData({ ...filters, search });
  };

  const handleFilter = <K extends keyof FiltersWithTypes>(
    key: K,
    value: FiltersWithTypes[K],
    action: 'toggle' | 'remove'
  ) => {
    const newSet = new Set<FiltersWithTypes[K]>(
      filters[key] as Set<FiltersWithTypes[K]>
    );

    switch (action) {
      case 'toggle':
        if (newSet.has(value)) newSet.delete(value);
        else newSet.add(value);
        break;
      case 'remove':
        newSet.delete(value);
        break;
      default:
        throw new Error('Invalid action');
    }

    filterData({ ...filters, [key]: newSet });
  };

  const filterData = (newFilters: Filters) => {
    setFilters(newFilters);

    const result = data.filter((action) => {
      const hasMatchingTag =
        newFilters.tags.size === 0 ||
        action.tags?.some((tag) => newFilters.tags.has(tag.name));

      const hasMatchingLevel =
        newFilters.difficulties.size === 0 ||
        newFilters.difficulties.has(action.level);

      const maxDuration = Math.max(...Array.from(newFilters.durations));
      const hasMatchingDuration =
        newFilters.durations.size === 0 || action.time <= maxDuration;

      const hasMatchingSearch =
        newFilters.search.length === 0 ||
        action.name.toLowerCase().includes(newFilters.search.toLowerCase());

      return (
        hasMatchingTag &&
        hasMatchingLevel &&
        hasMatchingDuration &&
        hasMatchingSearch
      );
    });

    setData(result);
  };

  useEffect(() => {
    if (data.length > 0) {
      filterData(filters);
    }
  }, [data]);

  return (
    <div
      data-testid="filterbar"
      className="mx-auto flex max-w-screen-lg flex-col gap-3 p-5"
    >
      <div className="relative w-full">
        <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
          <Search className="h-4 w-4" />
        </span>
        <Input
          data-testid="search-input"
          type="text"
          placeholder="Rechercher..."
          className="w-full py-2 pr-4 pl-10"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-row flex-wrap gap-2">
        {/* tag */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" data-testid="tag-button">
              {filters.tags.size > 0
                ? `${filters.tags.size} tag(s) sélectionné(s)`
                : 'Filtrer par tags'}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder="Rechercher un tag..." />
              <CommandList data-testid="tag-popover">
                <CommandEmpty>Aucun tag trouvé.</CommandEmpty>
                {tagsData?.getAllTags?.map((tag) => (
                  <CommandItem
                    key={tag.id}
                    onSelect={() => handleFilter('tags', tag.name, 'toggle')}
                    className="flex cursor-pointer justify-between"
                  >
                    <div>
                      <span className="mr-2 text-lg">{tag.icon}</span>
                      {tag.name}
                    </div>
                    {filters.tags.has(tag.name) && (
                      <Check className="text-primary h-4 w-4" />
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
            <Button variant="outline" data-testid="difficulty-button">
              {filters.difficulties.size > 0
                ? `${filters.difficulties.size} difficulté(s) sélectionnée(s)`
                : 'Filtrer par difficulté'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" data-testid="difficulty-popover">
            <Command>
              <CommandInput placeholder="difficulté" />
              <CommandList>
                <CommandEmpty>Aucun tag trouvé.</CommandEmpty>

                {difficulties.map((difficulty) => (
                  <CommandItem
                    key={difficulty.value}
                    onSelect={() =>
                      handleFilter('difficulties', difficulty.value, 'toggle')
                    }
                    className="justify-left flex cursor-pointer"
                  >
                    <difficulty.icon className={difficulty.className} />
                    {difficulty.label}
                    {filters.difficulties.has(difficulty.value) && (
                      <Check className="text-primary h-4 w-4" />
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
            <Button variant="outline" data-testid="duration-button">
              {filters.durations.size > 0
                ? `${filters.durations.size} durée(s) sélectionnée(s)`
                : 'Filtrer par durée'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0" data-testid="duration-popover">
            <Command>
              <CommandInput placeholder="durée" />
              <CommandList>
                <CommandEmpty>Aucune durée trouvée.</CommandEmpty>

                {durations.map((duration) => (
                  <CommandItem
                    key={duration}
                    onSelect={() =>
                      handleFilter('durations', duration, 'toggle')
                    }
                    className="justify-left flex cursor-pointer"
                  >
                    {getDurationLabel(duration)}
                    {filters.durations.has(duration) && (
                      <Check className="text-primary h-4 w-4" />
                    )}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {filters.tags.size ||
        filters.difficulties.size ||
        filters.durations.size ? (
          <Button
            data-testid="reset-filter-button"
            onClick={handleResetFilters}
            size="sm"
            variant="link"
          >
            Réinitialiser
          </Button>
        ) : null}
      </div>

      <div
        data-testid="filter-item-buttons"
        className="flex flex-row flex-wrap gap-2"
      >
        {Array.from(filters.tags).map((tag) => (
          <Button
            onClick={() => handleFilter('tags', tag, 'remove')}
            variant="ghost"
            key={tag}
          >
            {tag}
            <X className="h-4 w-4" />
          </Button>
        ))}

        {Array.from(filters.difficulties).map((difficulty) => (
          <Button
            onClick={() => handleFilter('difficulties', difficulty, 'remove')}
            variant="ghost"
            key={difficulty}
          >
            {difficulties.find((d) => d.value === difficulty)?.label}
            <X className="h-4 w-4" />
          </Button>
        ))}

        {Array.from(filters.durations).map((duration) => (
          <Button
            onClick={() => handleFilter('durations', duration, 'remove')}
            variant="ghost"
            key={duration}
          >
            {getDurationLabel(duration)}
            <X className="h-4 w-4" />
          </Button>
        ))}
      </div>
    </div>
  );
};
