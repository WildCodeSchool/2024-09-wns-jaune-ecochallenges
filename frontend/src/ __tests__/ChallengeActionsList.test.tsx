import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChallengeActionsList } from '../components/challenge-detail/ChallengeActionsList';
import {
  Action,
  Challenge,
  User,
  UserActionChallengeScore,
} from '../lib/graphql/generated/graphql-types';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Create a mock Apollo Client for tests
const mockClient = new ApolloClient({
  cache: new InMemoryCache(),
});

describe('ChallengeActionsList', () => {
  const mockActions: Partial<Action>[] = [
    { id: '1', name: 'Recycler', icon: 'recycle' },
    { id: '2', name: 'Éteindre les lumières', icon: 'light-off' },
  ];

  const mockUserActionChallengeScores: UserActionChallengeScore[] = [
    {
      points: 10,
      status: 'COMPLETED',
      action: { id: '1' } as Action,
      isValidated: true,
      comment: 'Commentaire',
      createdAt: new Date().toISOString(),
      validatedFor: { id: 'user-123' } as User,
      challenge: { id: 'challenge-abc' } as Challenge,
      validatedBy: { id: 'admin-user' } as User,
    },
  ];

  const mockUserId = 'user-123';

  const mockIsChallengeMember = true;

  it('should render without actions', () => {
    render(
      <ApolloProvider client={mockClient}>
        <ChallengeActionsList
          actions={[]}
          userActionChallengeScore={[]}
          userId={mockUserId}
          isChallengeMember={mockIsChallengeMember}
        />
      </ApolloProvider>
    );
    expect(screen.queryByTestId(/mock-action-item-/)).not.toBeInTheDocument();
  });

  it('should render ActionItem for each action', () => {
    render(
      <ApolloProvider client={mockClient}>
        <ChallengeActionsList
          actions={mockActions}
          userActionChallengeScore={mockUserActionChallengeScores}
          userId={mockUserId}
          isChallengeMember={mockIsChallengeMember}
        />
      </ApolloProvider>
    );

    expect(screen.getByText('Recycler')).toBeInTheDocument();
    expect(screen.getByText('Éteindre les lumières')).toBeInTheDocument();
  });
});
