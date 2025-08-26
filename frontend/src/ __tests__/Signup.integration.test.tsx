import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Signup } from '@/components/forms/auth/Signup';
import { SignUpDocument } from '@/lib/graphql/generated/graphql-types';
import { Login } from '@/components/forms/auth/Login';
import { useState } from 'react';

// helper rendu intégration
function AuthPortal({ mocks }: { mocks: MockedResponse[] }) {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <MemoryRouter initialEntries={['/user']}>
      <MockedProvider mocks={mocks}>
        {showLogin ? (
          <Login />
        ) : (
          <Signup onToggleForm={(v) => v && setShowLogin(true)} />
        )}
      </MockedProvider>
    </MemoryRouter>
  );
}

describe('Signup – integration (Router + Apollo)', () => {
  //Sucess navigation de signup apres succes et
  it("succès ➜ navigate('/user') + onToggleForm(true)", async () => {
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
          query: SignUpDocument, // ✅ vrai document du module réel
          variables: {
            data: {
              email: 'john@doe.dev',
              firstname: 'John',
              lastname: 'Doe',
              hashedPassword: 'Abc12345!',
            },
          },
        },
        result: { data: { signUp: JSON.stringify(profile) } }, // ou la forme attendue par ton schéma
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

    // (facultatif mais très parlant) : on vérifie que le bouton Login est visible
    // et que celui de Signup n'est plus présent.
    expect(
      await screen.findByRole('button', { name: 'Se connecter' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: "S'inscrire" })
    ).not.toBeInTheDocument();
  });

  it.only('échec ➜ email déjà pris → message erreur + pas de bascule Login', async () => {
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
        result: { data: { signUp: null } }, // simulate failure
      },
    ];

    render(<AuthPortal mocks={mocks} />);

    // remplir formulaire
    await userEvent.type(screen.getByLabelText('Prénom'), 'John');
    await userEvent.type(screen.getByLabelText('Nom'), 'Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@doe.dev');
    await userEvent.type(screen.getByLabelText('Mot de passe'), 'Abc12345!');
    await userEvent.type(
      screen.getByLabelText('Confirmez le mot de passe'),
      'Abc12345!'
    );
    await userEvent.click(screen.getByRole('button', { name: "S'inscrire" }));

    // assertions
    expect(
      await screen.findByTestId('signup-global-error')
    ).toBeInTheDocument();

    // pas de bascule : le bouton "Se connecter" ne doit pas apparaître
    expect(
      screen.queryByRole('button', { name: 'Se connecter' })
    ).not.toBeInTheDocument();
    // le bouton signup est toujours là
    expect(
      screen.getByRole('button', { name: "S'inscrire" })
    ).toBeInTheDocument();
  });
});
