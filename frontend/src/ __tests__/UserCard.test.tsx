import '@testing-library/jest-dom';
import { UserCard } from '@/components';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('UserCard Component', () => {
  it('should render the userCard component with the correct data', () => {
    const mockData = {
      id: 1,
      bernardPoints: 6566,
      nbActions: 234,
      nbChallenges: 1,
      picture: 'https://github.com/shadcn.png',
      pictureName: 'toto',
      initial: 'PA',
    };
    render(<UserCard {...mockData} />);

    const title = screen.getByText('Tes stats:');
    expect(title).toBeInTheDocument();

    const card = screen.getByTestId('user-card-1');
    expect(card).toBeInTheDocument();

    const bernardPoints = screen.getByText(mockData.bernardPoints);
    expect(bernardPoints).toBeInTheDocument();

    const nbActions = screen.getByText(mockData.nbActions);
    expect(nbActions).toBeInTheDocument();

    const nbChallenges = screen.getByText(mockData.nbChallenges);
    expect(nbChallenges).toBeInTheDocument();
  });
});
