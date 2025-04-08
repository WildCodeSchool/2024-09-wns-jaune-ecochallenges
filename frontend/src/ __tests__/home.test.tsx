import { Home } from '@/pages/Home';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Homepage', () => {
  it('renders the home page', () => {
    render(<Home />);

    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('🌱 Welcome to Eco-challenges 🌱');
  });
});
