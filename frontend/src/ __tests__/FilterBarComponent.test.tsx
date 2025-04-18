import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import { Filterbar, Filters } from '@/components';
import { describe, expect, it } from 'vitest';
import { useState } from 'react';
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
    tags: new Set(),
    difficulties: new Set(),
    durations: new Set(),
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

  it('renders the search input', () => {
    render(<Wrapper />);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveProperty('placeholder', 'Rechercher...');
  });

  it('renders the tag button', async () => {
    render(<Wrapper />);
    const tagButton = screen.getByTestId('tag-button');
    expect(tagButton).toHaveTextContent('Filtrer par tags');

    await userEvent.click(screen.getByTestId('tag-button'));
    const popover = await screen.findByRole('dialog');
    const tagOption = within(popover).getByText('Recyclage');

    expect(tagOption).toBeInTheDocument();

    await userEvent.click(tagOption);
    expect(tagButton).toHaveTextContent('1 tag(s) sélectionné(s)');

    const filterItemButtons = screen.getByTestId('filter-item-buttons');
    expect(filterItemButtons).toBeInTheDocument();
    expect(filterItemButtons.children).toHaveLength(1);

    const resetFilterButton = screen.getByTestId('reset-filter-button');
    expect(resetFilterButton).toBeInTheDocument();
    expect(resetFilterButton).toHaveTextContent('Réinitialiser');

    await userEvent.click(resetFilterButton);

    expect(tagButton).toHaveTextContent('Filtrer par tags');
    expect(resetFilterButton).not.toBeInTheDocument();
  });

  it('renders the difficulty button', async () => {
    render(<Wrapper />);
    const difficultyButton = screen.getByTestId('difficulty-button');
    expect(difficultyButton).toHaveTextContent('Filtrer par difficulté');

    await userEvent.click(screen.getByTestId('difficulty-button'));
    const popover = await screen.findByRole('dialog');
    const difficultyOption = within(popover).getByText('Facile');

    expect(difficultyOption).toBeInTheDocument();

    await userEvent.click(difficultyOption);
    expect(difficultyButton).toHaveTextContent(
      '1 difficulté(s) sélectionnée(s)'
    );

    const filterItemButtons = screen.getByTestId('filter-item-buttons');
    expect(filterItemButtons).toBeInTheDocument();
    expect(filterItemButtons.children).toHaveLength(1);

    const resetFilterButton = screen.getByTestId('reset-filter-button');
    expect(resetFilterButton).toBeInTheDocument();
    expect(resetFilterButton).toHaveTextContent('Réinitialiser');

    await userEvent.click(resetFilterButton);

    expect(difficultyButton).toHaveTextContent('Filtrer par difficulté');
    expect(resetFilterButton).not.toBeInTheDocument();
  });

  it('renders the duration button', async () => {
    render(<Wrapper />);
    const durationButton = screen.getByTestId('duration-button');
    expect(durationButton).toHaveTextContent('Filtrer par durée');

    await userEvent.click(screen.getByTestId('duration-button'));
    const popover = await screen.findByRole('dialog');
    const durationOption = within(popover).getByText('≤ 2 heures');

    expect(durationOption).toBeInTheDocument();

    await userEvent.click(durationOption);
    expect(durationButton).toHaveTextContent('1 durée(s) sélectionnée(s)');

    const filterItemButtons = screen.getByTestId('filter-item-buttons');
    expect(filterItemButtons).toBeInTheDocument();
    expect(filterItemButtons.children).toHaveLength(1);

    const resetFilterButton = screen.getByTestId('reset-filter-button');
    expect(resetFilterButton).toBeInTheDocument();
    expect(resetFilterButton).toHaveTextContent('Réinitialiser');

    await userEvent.click(resetFilterButton);

    expect(durationButton).toHaveTextContent('Filtrer par durée');
    expect(resetFilterButton).not.toBeInTheDocument();
  });
});
