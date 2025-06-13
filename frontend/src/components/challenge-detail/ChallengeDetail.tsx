import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { ChallengeBanner } from './ChallengeBanner';
import { ActionsTabs } from './ActionsTabs/ActionsTabs';
import { Button } from '@/components/ui/button';
import {
<<<<<<< HEAD
  useActionByChallengeWithStatusQuery,
  UserActionChallengeScore,
} from '@/lib/graphql/generated/graphql-types';
import { useUserStore } from '@/lib/zustand/userStore';
=======
  Action,
  useActionByChallengeWithStatusQuery,
  useGetActionsByChallengeIdQuery,
  UserActionChallenge,
} from '@/lib/graphql/generated/graphql-types';
>>>>>>> 71aee31 (add the base logic to complete an action of a challenge)

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
=======
/* const initialActions: ActionLite[] = [
  {
    id: '1',
    name: 'Éteindre les lumières inutiles',
    description: "Réduire la consommation d'énergie à la maison.",
    status: 'done',
    tags: [{ name: 'Énergie' }],
    icon: 'lightbulb',
  },
  {
    id: '2',
    name: 'Prendre le vélo',
    description: 'Utiliser le vélo pour les trajets courts.',
    status: 'pending',
    tags: [{ name: 'Transport' }],
    icon: 'bike',
  },
  {
    id: '3',
    name: 'Recycler les déchets',
    description: 'Trier les emballages, papiers, et déchets organiques.',
    status: 'done',
    tags: [{ name: 'Recyclage' }],
    icon: 'recycle',
  },
  {
    id: '4',
    name: 'Installer un mousseur de robinet',
    description: 'Économiser l’eau facilement.',
    status: 'pending',
    tags: [{ name: 'Eau' }],
    icon: 'droplet',
  },
]; */

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
<<<<<<< HEAD
          challengeId={challengeId}
          userId={userId}
          isAuthorized={isAuthorized}
          actions={data.getChallenge.actions || []}
          userActionChallengeScore={
            (data.getChallenge
              ?.userActionChallengeScores as UserActionChallengeScore[]) || []
          }
=======
          actions={data?.getChallenge.actions || []}
          onToggleStatus={onToggleStatus}
          userActionChallenges={data?.getChallenge.userActionChallenges || []}
>>>>>>> 71aee31 (add the base logic to complete an action of a challenge)
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
