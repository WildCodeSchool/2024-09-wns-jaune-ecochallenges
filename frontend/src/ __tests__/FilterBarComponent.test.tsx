import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import { Filterbar, Filters } from '@/components';
import { describe, expect, it } from 'vitest';
import { act, useState } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ALL_TAGS } from '@/lib/graphql/operations';
import userEvent from '@testing-library/user-event';

const mockedTags = [
  {
    request: {
      query: GET_ALL_TAGS,
    },
    result: {
      data: {
        getAllTags: [
          { id: '1', name: 'Recyclage' },
          { id: '2', name: 'Énergie Verte' },
        ],
      },
    },
  },
];

describe('Filter bar component tests', () => {
  const mockFilters: Filters = {
    selectedTags: [],
    selectedDifficulty: [],
    selectedDurations: [],
    search: '',
  };
  const Wrapper = () => {
    const [filters, setFilters] = useState(mockFilters);

    return (
      <MockedProvider mocks={mockedTags} addTypename={false}>
        <Filterbar filters={filters} setFilters={setFilters} />
      </MockedProvider>
    );
  };

  it('renders the FilterBar component', () => {
    render(<Wrapper />);
    const test = screen.getByTestId('filterbar');
    expect(test).toBeInTheDocument();
  });

  /* it('renders the search input', () => {
    render(<Wrapper />);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveProperty('placeholder', 'Rechercher...');
  }); */

  it('renders the tag button', async () => {
    render(<Wrapper />);
    const tagButton = screen.getByTestId('tag-button');
    expect(tagButton).toHaveTextContent('Filtrer par tags');

    await userEvent.click(screen.getByTestId('tag-button'));
    const popover = await screen.findByRole('dialog'); // Or use a testId on PopoverContent
    const tagOption = within(popover).getByText('Recyclage');

    expect(tagOption).toBeInTheDocument();

    /*

    expect(tagButton).toHaveTextContent('1 tag(s) sélectionné(s)');

    const filterItemButtons = screen.getByTestId('filter-item-buttons');
    expect(filterItemButtons).toBeInTheDocument();
    expect(filterItemButtons.children).toHaveLength(1);

    const resetFilterButton = screen.getByTestId('reset-filter-button');
    expect(resetFilterButton).toBeInTheDocument();
    expect(resetFilterButton).toHaveTextContent('Réinitialiser');

    resetFilterButton.click();

    expect(tagButton).toHaveTextContent('Filtrer par tags');
    expect(filterItemButtons).not.toBeInTheDocument(); */
  });

  /*  it('renders the difficulty button', () => {
        render(<Wrapper />);
        const difficultyButton = screen.getByTestId('difficulty-button');
        expect(difficultyButton).toHaveTextContent('Filtrer par difficulté');

        difficultyButton.click();

        const difficultyPopover = screen.getByTestId('difficulty-popover');
        expect(difficultyPopover).toBeInTheDocument();
        expect(difficultyPopover.children).toHaveLength(20);

        const difficultyItem = screen.getByText('Facile');
        expect(difficultyItem).toBeInTheDocument();

        difficultyItem.click();

        expect(difficultyButton).toHaveTextContent(
          '0 difficulté(s) sélectionné(s)'
        );

        const filterItemButtons = screen.getByTestId('filter-item-buttons');
        expect(filterItemButtons).toBeInTheDocument();
        expect(filterItemButtons.children).toHaveLength(1);

        const resetFilterButton = screen.getByTestId('reset-filter-button');
        expect(resetFilterButton).toBeInTheDocument();
        expect(resetFilterButton).toHaveTextContent('Réinitialiser');

        resetFilterButton.click();

        expect(difficultyButton).toHaveTextContent('Filtrer par difficulté');
        expect(filterItemButtons).not.toBeInTheDocument();
      }); */
});
