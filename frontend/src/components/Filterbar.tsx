import { Leaf, Search, Sprout, TreePalm, X } from 'lucide-react';
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
import { Check } from 'lucide-react';
import { useGetAllTagsQuery } from '@/lib/graphql/generated/graphql-types';

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

interface FilterBarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

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
] as const;

export const Filterbar = ({ filters, setFilters }: FilterBarProps) => {
  const { data: tagsData } = useGetAllTagsQuery();

  const handleFilter = <K extends keyof FiltersWithTypes>(
    key: K,
    value: FiltersWithTypes[K],
    action: 'toggle' | 'remove'
  ) => {
    setFilters((prev) => {
      const newSet = new Set<FiltersWithTypes[K]>(
        prev[key] as Set<FiltersWithTypes[K]>
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

      return { ...prev, [key]: newSet };
    });
  };

  const resetFilter = () => {
    setFilters({
      search: '',
      tags: new Set(),
      durations: new Set(),
      difficulties: new Set(),
    });
  };

  return (
    <div
      data-testid="filterbar"
      className="mx-auto flex max-w-screen-lg flex-col gap-3 p-5"
    >
      <div className="relative w-full">
        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
          <Search className="h-4 w-4" />
        </span>
        <Input
          data-testid="search-input"
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
            <Button variant="outline" data-testid="tag-button">
              {filters.tags.size > 0
                ? `${filters.tags.size} tag(s) sélectionné(s)`
                : 'Filtrer par tags'}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-72 p-0">
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
            <Button variant="outline" data-testid="duration-button">
              {filters.durations.size > 0
                ? `${filters.durations.size} durée(s) sélectionnée(s)`
                : 'Filtrer par durée'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" data-testid="duration-popover">
            <Command>
              <CommandInput placeholder="durée" />
              <CommandList>
                <CommandEmpty>Aucune durée trouvée.</CommandEmpty>

                {durations.map((duration) => (
                  <CommandItem
                    key={duration.value}
                    onSelect={() =>
                      handleFilter('durations', duration.value, 'toggle')
                    }
                    className="justify-left flex cursor-pointer"
                  >
                    {duration.label}
                    {filters.durations.has(duration.value) && (
                      <Check className="h-4 w-4 text-emerald-500" />
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
            onClick={resetFilter}
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
            {durations.find((d) => d.value === duration)?.label}
            <X className="h-4 w-4" />
          </Button>
        ))}
      </div>
    </div>
  );
};
