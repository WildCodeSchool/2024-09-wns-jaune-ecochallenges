import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Signup } from '@/components/forms/auth/Signup';
import * as gqlModule from '@/lib/graphql/generated/graphql-types';

const onToggleForm = vi.fn();
const navigateMock = vi.fn();
vi.mock('react-router-dom', async (orig) => {
  const mod: any = await orig();
  return { ...mod, useNavigate: () => navigateMock };
});

const signUpMutationMock = vi.fn();
vi.mock('@/lib/graphql/generated/graphql-types', () => {
  return { useSignUpMutation: () => [signUpMutationMock] };
});

function deferred<T>() {
  let resolve!: (v: T) => void;
  let reject!: (e: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe('Signup-unit', () => {
  it('should render all form fields and the signup button', () => {});

  render(<Signup onToggleForm={onToggleForm} />);
  expect(screen.getByLabelText('Prénom')).toBeInTheDocument();
  expect(screen.getByLabelText('Nom')).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();
  expect(
    screen.getByLabelText('Confirmez le mot de passe')
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: "S'inscrire" })
  ).toBeInTheDocument();

  it('should mark all fields as required', () => {
    render(<Signup onToggleForm={onToggleForm} />);

    expect(screen.getByLabelText('Prénom')).toBeRequired();
    expect(screen.getByLabelText('Nom')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Mot de passe')).toBeRequired();
    expect(screen.getByLabelText('Confirmez le mot de passe')).toBeRequired();
  });
  it('should set focus on the first invalid field when submitting an empty form', async () => {
    render(<Signup onToggleForm={onToggleForm} />);
    await userEvent.click(screen.getByRole('button', { name: "S'inscrire" }));
    expect(document.activeElement).toBe(screen.getByLabelText('Prénom'));
  });

  it('should display an error and set aria-invalid for an invalid email', async () => {
    render(<Signup onToggleForm={onToggleForm} />);
    await userEvent.type(screen.getByLabelText('Prénom'), 'John');
    await userEvent.type(screen.getByLabelText('Nom'), 'Doe');
    await userEvent.type(screen.getByLabelText('Mot de passe'), 'Abc12345!');
    await userEvent.type(
      screen.getByLabelText('Confirmez le mot de passe'),
      'Abc12345!'
    );
    const email = screen.getByLabelText('Email');
    await userEvent.type(email, 'foo@'); // invalide
    await userEvent.click(screen.getByRole('button', { name: "S'inscrire" }));

    expect(email).toHaveAttribute('aria-invalid', 'true');
    const msg = document.getElementById('email-error');
    expect(msg).toBeTruthy();
    expect(msg?.textContent).not.toBe('');
  });

  it('should display a password mismatch error', async () => {
    render(<Signup onToggleForm={onToggleForm} />);
    await userEvent.type(screen.getByLabelText('Prénom'), 'John');
    await userEvent.type(screen.getByLabelText('Nom'), 'Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@doe.dev');
    await userEvent.type(screen.getByLabelText('Mot de passe'), 'Abc12345!');
    await userEvent.type(
      screen.getByLabelText('Confirmez le mot de passe'),
      'Abc123'
    );
    await userEvent.click(screen.getByRole('button', { name: "S'inscrire" }));

    const confirm = screen.getByLabelText('Confirmez le mot de passe');
    expect(confirm).toHaveAttribute('aria-invalid', 'true');
    const msg = document.getElementById('confirmPassword-error');
    expect(msg).toBeTruthy();
    expect(msg?.textContent).not.toBe('');
  });

  it('should show a loading state during form submission', async () => {
    const d = deferred<{ data: { signUp: string | null } }>();
    vi.spyOn(gqlModule, 'useSignUpMutation').mockReturnValue([
      vi.fn().mockImplementation(() => d.promise),
    ] as any);

    render(<Signup onToggleForm={onToggleForm} />);
    await userEvent.type(screen.getByLabelText('Prénom'), 'John');
    await userEvent.type(screen.getByLabelText('Nom'), 'Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@doe.dev');
    await userEvent.type(screen.getByLabelText('Mot de passe'), 'Abc12345!');
    await userEvent.type(
      screen.getByLabelText('Confirmez le mot de passe'),
      'Abc12345!'
    );

    const btn = screen.getByRole('button', { name: "S'inscrire" });
    await userEvent.click(btn);

    await waitFor(() => {
      expect(btn).toBeDisabled();
      expect(btn).toHaveAttribute('aria-busy', 'true');
      expect(btn).toHaveTextContent('Envoi en cours…');
    });

    d.resolve({ data: { signUp: null } });

    await waitFor(() => {
      expect(btn).not.toBeDisabled();
      expect(btn).toHaveAttribute('aria-busy', 'false');
      expect(btn).toHaveTextContent("S'inscrire");
    });
  });
});
