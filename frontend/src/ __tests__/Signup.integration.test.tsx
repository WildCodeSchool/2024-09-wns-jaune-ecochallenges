import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { InMemoryCache } from '@apollo/client';
import { useState } from 'react';

import { Signup } from '@/components/forms/auth/Signup';
import { Login } from '@/components/forms/auth/Login';
import { SignUpDocument } from '@/lib/graphql/generated/graphql-types';

function AuthPortal({ mocks }: { mocks: MockedResponse[] }) {
  const [showLogin, setShowLogin] = useState(false);
  const cache = new InMemoryCache();
  return (
    <MemoryRouter initialEntries={['/user']}>
      <MockedProvider mocks={mocks} cache={cache}>
        {showLogin ? (
          <Login />
        ) : (
          <Signup onToggleForm={(v) => v && setShowLogin(true)} />
        )}
      </MockedProvider>
    </MemoryRouter>
  );
}

describe('Signup integration (Router + Apollo)', () => {
  it('should switch to Login view after successful signup', async () => {
    const profile = {
      id: '1',
      email: 'john@doe.dev',
      firstname: 'John',
      lastname: 'Doe',
      role: 'USER',
      description: '',
    };

    const mocks: MockedResponse[] = [
      {
        request: {
          query: SignUpDocument,
          variables: {
            data: {
              email: 'john@doe.dev',
              firstname: 'John',
              lastname: 'Doe',
              hashedPassword: 'Abc12345!',
            },
          },
        },
        result: { data: { signUp: JSON.stringify(profile) } },
      },
    ];

    render(<AuthPortal mocks={mocks} />);

    await userEvent.type(screen.getByLabelText('Prénom'), 'John');
    await userEvent.type(screen.getByLabelText('Nom'), 'Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@doe.dev');
    await userEvent.type(screen.getByLabelText('Mot de passe'), 'Abc12345!');
    await userEvent.type(
      screen.getByLabelText('Confirmez le mot de passe'),
      'Abc12345!'
    );
    await userEvent.click(screen.getByRole('button', { name: "S'inscrire" }));

    expect(
      await screen.findByRole('button', { name: 'Se connecter' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: "S'inscrire" })
    ).not.toBeInTheDocument();
  });

  it('should show global error and stay on Signup when email is already taken', async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: SignUpDocument,
          variables: {
            data: {
              email: 'john@doe.dev',
              firstname: 'John',
              lastname: 'Doe',
              hashedPassword: 'Abc12345!',
            },
          },
        },
        result: { data: { signUp: null } },
      },
    ];

    render(<AuthPortal mocks={mocks} />);

    await userEvent.type(screen.getByLabelText('Prénom'), 'John');
    await userEvent.type(screen.getByLabelText('Nom'), 'Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@doe.dev');
    await userEvent.type(screen.getByLabelText('Mot de passe'), 'Abc12345!');
    await userEvent.type(
      screen.getByLabelText('Confirmez le mot de passe'),
      'Abc12345!'
    );
    await userEvent.click(screen.getByRole('button', { name: "S'inscrire" }));

    expect(
      await screen.findByTestId('signup-global-error')
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Se connecter' })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: "S'inscrire" })
    ).toBeInTheDocument();
  });
});
