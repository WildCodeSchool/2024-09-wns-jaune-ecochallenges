import '@testing-library/jest-dom';
import { ChallengeCarouselCard } from '@/components';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Challenge Carousel Card Component', () => {
  it('should render the carousel Card component with the correct data', () => {
    const mockData = {
      id: '1',
      name: 'No Plastic Week',
      imageUrl: './images/sample.jpg',
      users: ['Lina', 'Matthieu', 'Sophie'],
      description:
        'Avoid single-use plastics for 7 days. Bring your own bags, bottles, and containers!',
      tags: ['plastic-free', 'zero waste', 'sustainable living'],
    };
    render(<ChallengeCarouselCard {...mockData} />);

    const card = screen.getByTestId('card-1');
    expect(card).toBeInTheDocument();

    const image = screen.getByTestId('card-image');
    expect(image).toHaveAttribute('src', mockData.imageUrl);

    const title = screen.getByTestId('card-title');
    expect(title).toHaveTextContent('No Plastic Week');

    const tags = screen.getAllByTestId('pills');
    expect(tags).toHaveLength(2);

    const moreTag = screen.getByTestId('tag-more');
    expect(moreTag).toHaveTextContent('+1');

    const description = screen.getByTestId('card-description');
    expect(description).toHaveTextContent(
      'Avoid single-use plastics for 7 days. Bring your own bags, bottles, and containers!'
    );

    const button = screen.getByTestId('card-button');
    expect(button).toHaveTextContent('Rejoindre ce challenge');
  });
});
