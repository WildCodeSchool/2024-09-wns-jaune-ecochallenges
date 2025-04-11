export const Filterbar = () => {
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
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-row flex-wrap gap-2">
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

        {/* Durée */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {selectedDurations.length > 0
                ? `${selectedDurations.length} durée(s) sélectionnée(s)`
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
                    {selectedDurations.includes(duration.value) && (
                      <Check className="h-4 w-4 text-emerald-500" />
                    )}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedTags.length ||
        selectedDifficulty.length ||
        selectedDurations.length ? (
          <Button onClick={resetFilter} size="sm" variant="link">
            Réinitialiser
          </Button>
        ) : null}
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
  );
};
