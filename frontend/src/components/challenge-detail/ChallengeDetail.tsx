import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { ChallengeBanner } from './ChallengeBanner';
import { ActionsTabs } from './ActionsTabs/ActionsTabs';
import { Button } from '@/components/ui/button';
import {
  useActionByChallengeWithStatusQuery,
  UserActionChallenge,
} from '@/lib/graphql/generated/graphql-types';
import { useUserStore } from '@/lib/zustand/userStore';

type ChallengeDetailProps = {
  challengeId: string;
};

<<<<<<< HEAD
export const ChallengeDetail = ({ challengeId }: ChallengeDetailProps) => {
  const userId = useUserStore((state) => state.user?.id || undefined);

  const navigate = useNavigate();
  const { data, loading, error } = useActionByChallengeWithStatusQuery({
    variables: { getChallengeId: challengeId },
  });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground mb-4 text-2xl font-semibold">
            Chargement des données...
          </div>
          <div className="border-t-primary border-border mx-auto h-8 w-8 animate-spin rounded-full border-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-destructive mb-4 text-xl font-semibold">
            Erreur lors du chargement
          </div>
          <div className="text-muted-foreground">{error.message}</div>
        </div>
      </div>
    );
  }

  if (!data?.getChallenge) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground mb-4 text-xl font-semibold">
            Aucune donnée de challenge récupérée
          </div>
        </div>
      </div>
    );
  }

  const isAuthorized = data.getChallenge.members.some(
    (member) => member.id === userId
  );

  const normalizeUAC = (uacs?: UserActionChallenge[]) =>
    uacs?.map((uac) => ({
      ...uac,
      // comment: uac.comment ?? '',
      action: {
        ...uac.action,
        name: uac.action.name ?? '',
        description: uac.action.description ?? '',
        createdAt: uac.action.createdAt ?? '',
        icon: uac.action.icon ?? '',
        tags: uac.action.tags ?? [],
        challenges: uac.action.challenges ?? [],
      },
    })) || [];

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-6">
      <ChallengeBanner
        challenge={data.getChallenge}
        userActionChallengesScore={
          (data.getChallenge
            ?.userActionChallengeScores as Partial<UserActionChallengeScore>[]) ||
          []
        }
      />

      <div className="mt-6 flex justify-center">
        <ActionsTabs
          challengeId={challengeId}
          userId={userId}
          isAuthorized={isAuthorized}
          actions={data.getChallenge.actions || []}
          userActionChallenges={
            (data.getChallenge
              ?.userActionChallenges as Partial<UserActionChallenge>[]) || []
          }
        />
      </div>

      {/* Retour à la page précedente */}
      <Button
        onClick={() => navigate(-1)}
        className="absolute bottom-4 left-4 z-50 size-10 rounded-full shadow-md shadow-black/50"
        aria-label="Retour"
        title="Retour"
      >
        <ArrowLeft className="size-5" />
      </Button>

      {/* TODO >>> Modifier le challenge si user est l'owner du */}
      <Link
        to={`/challenge/${challengeId}/edit`}
        className="absolute right-4 bottom-4 z-50 flex size-10 items-center justify-center rounded-full bg-green-600 text-white shadow-md shadow-black/50 hover:bg-green-700"
        aria-label="Modifier le challenge"
        title="Modifier le challenge"
      >
        <Pencil className="size-5" />
      </Link>
    </div>
  );
};
