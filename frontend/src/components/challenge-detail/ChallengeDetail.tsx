import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { ChallengeBanner } from './ChallengeBanner';
import { ActionsTabs } from './ActionsTabs';
import { Button } from '@/components/ui/button';
import {
  Action,
  useActionByChallengeWithStatusQuery,
  useGetActionsByChallengeIdQuery,
  UserActionChallenge,
} from '@/lib/graphql/generated/graphql-types';

type ChallengeDetailProps = {
  challengeId: string;
};

export const ChallengeDetail = ({ challengeId }: ChallengeDetailProps) => {
  const navigate = useNavigate();
  // get all actions
  const { data, loading, error } = useActionByChallengeWithStatusQuery({
    variables: { getChallengeId: challengeId },
  });

  if (loading) console.log('Chargement des données...');
  if (error) console.error('Erreur chargement challenge:', error);
  if (!data?.getChallenge) console.warn('Aucune donnée de challenge récupérée');

  const onToggleStatus = (id: string) => {
    console.log('id', id);
    console.log('toggle status');
    /*  setActions((prev) =>
      prev.map((action) =>
        action.id === id
          ? { ...action, status: action.status === 'done' ? 'pending' : 'done' }
          : action
      )
    ); */
  };

  const normalizeUAC = (uacs?: UserActionChallenge[]) =>
    uacs?.map((uac) => ({
      ...uac,
      comment: uac.comment ?? '',
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
      <ChallengeBanner challengeId={challengeId} />

      <div className="mt-6 flex justify-center">
        <ActionsTabs
          actions={data?.getChallenge.actions || []}
          onToggleStatus={onToggleStatus}
          //userActionChallenges={data?.getChallenge.userActionChallenges || []}
          userActionChallenges={normalizeUAC(
            data?.getChallenge.userActionChallenges
          )}
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
