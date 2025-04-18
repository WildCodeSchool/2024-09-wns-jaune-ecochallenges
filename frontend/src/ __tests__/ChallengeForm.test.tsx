import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChallengeForm } from '../components/ChallengeForm/ChallengeForm';
import { toast } from 'sonner';
import {
  useCreateChallengeMutation,
  useUpdateChallengeMutation,
  useGetChallengeQuery,
} from '../lib/graphql/generated/graphql-types';

vi.mock('../lib/graphql/generated/graphql-types', () => ({
  useCreateChallengeMutation: vi.fn(),
  useUpdateChallengeMutation: vi.fn(),
  useGetChallengeQuery: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ChallengeForm Component', () => {
  const mockCreateChallenge = vi.fn();
  const mockUpdateChallenge = vi.fn();
  const mockActionsQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCreateChallengeMutation as vi.Mock).mockReturnValue([
      mockCreateChallenge,
    ]);
    (useUpdateChallengeMutation as vi.Mock).mockReturnValue([
      mockUpdateChallenge,
    ]);
  });

  it('should create a challenge with NO ACTIONS and NO USERS successfully', async () => {
    mockCreateChallenge.mockResolvedValue({ errors: null });

    render(<ChallengeForm />);

    fireEvent.change(screen.getByLabelText('Nom'), {
      target: { value: 'New Challenge' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Description' },
    });
    fireEvent.change(screen.getByLabelText('Période du challenge'), {
      target: {
        value: { from: new Date('2025-04-01'), to: new Date('2025-04-30') },
      },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockCreateChallenge).toHaveBeenCalledWith({
        variables: {
          data: {
            label: 'New Challenge',
            description: 'Description',
            bannerUrl: '',
            startDate: '2025-04-01T00:00:00.000Z',
            endDate: '2025-04-30T23:59:59.999Z',
            actions: [],
          },
        },
      });
      expect(toast.success).toHaveBeenCalledWith('Challenge créé avec succès');
    });
  });

  it('should create a challenge with ACTIONS and NO USERS successfully', async () => {
    mockCreateChallenge.mockResolvedValue({ errors: null });
    mockActionsQuery.mockResolvedValue({
      data: {
        getActions: [
          { id: '1', name: 'Action 1' },
          { id: '2', name: 'Action 2' },
          { id: '3', name: 'Action 3' },
        ],
      },
    });

    render(<ChallengeForm />);

    fireEvent.change(screen.getByLabelText('Nom'), {
      target: { value: 'New Challenge' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Description' },
    });
    fireEvent.change(screen.getByLabelText('Période du challenge'), {
      target: {
        value: { from: new Date('2025-04-01'), to: new Date('2025-04-30') },
      },
    });
    fireEvent.click(screen.getByRole('checkbox', { name: /Action 1/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /Action 2/i }));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockCreateChallenge).toHaveBeenCalledWith({
        variables: {
          data: {
            label: 'New Challenge',
            description: 'Description',
            bannerUrl: '',
            startDate: '2025-04-01T00:00:00.000Z',
            endDate: '2025-04-30T23:59:59.999Z',
            actions: ['1', '2'],
          },
        },
      });
      expect(toast.success).toHaveBeenCalledWith('Challenge créé avec succès');
    });
  });

  // TODO : Add test for creating a challenge with ACTIONS and USERS
  // it('should create a challenge with ACTIONS and USERS successfully', async () => {
  // });

  // TODO : Add test for error / fail when creating a challenge

  it('should update a challenge with NO CHANGE on ACTIONS and USER successfully', async () => {
    mockUpdateChallenge.mockResolvedValue({ errors: null });

    (useGetChallengeQuery as vi.Mock).mockReturnValue({
      data: {
        getChallenge: {
          id: '123',
          label: 'Existing Challenge',
          description: 'This is an existing challenge',
          bannerUrl: 'https://example.com/banner.jpg',
          startDate: '2025-04-01T00:00:00.000Z',
          endDate: '2025-04-30T23:59:59.999Z',
          actions: [
            { id: '1', name: 'Action 1' },
            { id: '2', name: 'Action 2' },
          ],
        },
      },
      loading: false,
      error: null,
    });

    render(<ChallengeForm challengeId="12" />);

    fireEvent.change(screen.getByLabelText('Nom'), {
      target: { value: 'Updated Challenge' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockUpdateChallenge).toHaveBeenCalledWith({
        variables: {
          id: '12',
          data: {
            label: 'Updated Challenge',
            description: '',
            bannerUrl: '',
            startDate: expect.any(String),
            endDate: expect.any(String),
            actions: [],
          },
        },
      });
      expect(toast.success).toHaveBeenCalledWith(
        'Challenge modifié avec succès'
      );
    });
  });

  it('should show an error when creating a challenge fails', async () => {
    mockCreateChallenge.mockResolvedValue({
      errors: [{ message: 'Create Error' }],
    });

    render(<ChallengeForm />);

    fireEvent.change(screen.getByPlaceholderText('Nom'), {
      target: { value: 'New Challenge' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockCreateChallenge).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        'Erreur lors de la création du challenge'
      );
    });
  });

  it('should show an error when updating a challenge fails', async () => {
    mockUpdateChallenge.mockResolvedValue({
      errors: [{ message: 'Update Error' }],
    });

    render(<ChallengeForm challengeId="123" />);

    fireEvent.change(screen.getByPlaceholderText('Nom'), {
      target: { value: 'Updated Challenge' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockUpdateChallenge).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        'Erreur lors de la modification du challenge'
      );
    });
  });

  it('should display validation errors when form fields are invalid', async () => {
    render(<ChallengeForm />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Vous devez obligatoirement donner un nom à votre challenge pour le créer'
        )
      ).toBeInTheDocument();
      expect(toast.error).toHaveBeenCalledWith(
        'Veuillez corriger les erreurs avant de continuer'
      );
    });
  });

  it('should switch to the correct tab when there are validation errors', async () => {
    render(<ChallengeForm />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Infos')).toHaveAttribute('data-state', 'active');
      expect(toast.error).toHaveBeenCalledWith(
        'Veuillez corriger les erreurs avant de continuer'
      );
    });
  });
});
