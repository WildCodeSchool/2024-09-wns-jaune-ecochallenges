import '@testing-library/jest-dom';
import { CarouselComponent, ChallengeCard } from '@/components';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('embla-carousel-react', async () => {
  const emblaApiMock = {
    canScrollPrev: () => true,
    canScrollNext: () => true,
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    scrollTo: vi.fn(),
    scrollSnapList: () => [0, 1],
    selectedScrollSnap: () => 0,
    on: vi.fn(),
    off: vi.fn(),
  };

  return {
    __esModule: true,
    default: () => [vi.fn(), emblaApiMock],
  };
});

const mockData = [
  {
    id: '1',
    label: 'Jardin collectif sauvage',
    description:
      'Identifiez un espace urbain délaissé et transformez-le en micro-jardin de biodiversité avec vos voisins. Semez des fleurs mellifères !',
    bannerUrl: 'wild-garden-banner.jpg',
    startDate: '2025-03-27T00:00:00Z',
    endDate: '2025-09-27T23:59:59Z',
    actions: [
      {
        id: '1',
        name: 'Installer des mousseurs',
        icon: 'drop',
        tags: [
          { id: '9', name: 'Eau', icon: '💧' },
          {
            id: '3',
            name: 'Consommation',
            icon: '🛍️',
          },
        ],
      },
      {
        id: '3',
        name: 'Audit éclairage',
        icon: 'drop',
        tags: [
          {
            id: '13',
            name: 'Éclairage',
            icon: '💡',
          },
          {
            id: '1',
            name: 'Énergie',
            icon: '⚡',
          },
        ],
      },
    ],
    owner: 'admin@example.com',
    members: [
      'admin@example.com',
      'john@example.com',
      'jane@example.com',
      'michael@example.com',
      'sarah@example.com',
    ],
  },
  {
    id: '2',
    label: 'Réduction des déchets',
    description:
      'Identifiez un espace urbain délaissé et transformez-le en micro-jardin de biodiversité avec vos voisins. Semez des fleurs mellifères !',
    bannerUrl: 'wild-garden-banner.jpg',
    startDate: '2025-06-27T00:00:00Z',
    endDate: '2025-11-27T23:59:59Z',
    actions: [
      {
        id: '1',
        name: 'Installer des mousseurs',
        icon: 'drop',
        tags: [
          { id: '9', name: 'Eau', icon: '💧' },
          {
            id: '3',
            name: 'Consommation',
            icon: '🛍️',
          },
        ],
      },
      {
        id: '3',
        name: 'Audit éclairage',
        icon: 'drop',
        tags: [
          {
            id: '13',
            name: 'Éclairage',
            icon: '💡',
          },
          {
            id: '1',
            name: 'Énergie',
            icon: '⚡',
          },
        ],
      },
    ],
    owner: 'admin@example.com',
    members: [
      'admin@example.com',
      'john@example.com',
      'jane@example.com',
      'michael@example.com',
      'sarah@example.com',
    ],
  },
];

describe('CarouselComponent (integration)', () => {
  it('affiche tous les ChallengeCard et permet la navigation', async () => {
    render(
      <MemoryRouter>
        <CarouselComponent
          data={mockData as any}
          CardComponent={ChallengeCard}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Jardin collectif sauvage')).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();

    nextButton.click();
    expect(screen.getByText('Réduction des déchets')).toBeInTheDocument();
  });
});
