import '@testing-library/jest-dom';
import { CarouselComponent, ChallengeCard } from '@/components';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }: any) => <div data-testid="carousel">{children}</div>,
  CarouselApi: vi.fn(),
  CarouselContent: ({ children }: any) => <div>{children}</div>,
  CarouselItem: ({ children }: any) => <div>{children}</div>,
  CarouselNext: () => <button>Next</button>,
  CarouselPrevious: () => <button>Prev</button>,
}));

vi.mock('embla-carousel-autoplay', () => ({
  default: () => ({
    play: () => {},
    stop: () => {},
    reset: () => {},
  }),
}));

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
];

describe('Carousel Component', () => {
  it('renders the carousel wrapper', () => {
    render(<CarouselComponent data={mockData} CardComponent={ChallengeCard} />);
    const carousel = screen.getByTestId('carousel');
    expect(carousel).toBeInTheDocument();
  });

  it('should render the carousel component with the correct data', () => {
    render(<CarouselComponent data={mockData} CardComponent={ChallengeCard} />);

    expect(screen.getByTestId('card-1')).toBeInTheDocument();
  });
});
