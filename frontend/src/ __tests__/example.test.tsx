import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { ActionCard, Pill } from '@/components';
import { describe, expect, it } from 'vitest';

describe('Example tests', () => {
  it('renders the Pill component with a simple text', () => {
    render(<Pill>Test</Pill>);

    const test = screen.getByTestId('pill');

    expect(test).toBeInTheDocument();
    expect(test.textContent).toBe('Test');
  });

  it('render the action card with a simple props', () => {
    render(
      <ActionCard
        action={{
          id: '1',
          name: 'Test Action',
          description: 'Test Description',
          icon: 'CirclePlus',
          level: 1,
          requires_view: true,
          time: 1,
          createdAt: '2021-01-01',
        }}
      />
    );
    const actionCard = screen.getByTestId('action-card');

    expect(actionCard).toBeInTheDocument();

    const actionCardButton = screen.getByTestId('action-card-button');

    expect(actionCardButton).toBeInTheDocument();
  });
});
