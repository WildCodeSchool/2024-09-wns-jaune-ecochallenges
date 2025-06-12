import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { ChallengeBanner } from './ChallengeBanner';
import { ActionsTabs, ActionLite } from './ActionsTabs';
import { Button } from '@/components/ui/button';
import {
  Action,
  useActionByChallengeWithStatusQuery,
  useGetActionsByChallengeIdQuery,
} from '@/lib/graphql/generated/graphql-types';

type ChallengeDetailProps = {
  challengeId: string;
};

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
  //  const [actions, setActions] = useState<ActionLite[]>(initialActions);
  // get all actions
  const { data, loading, error } = useActionByChallengeWithStatusQuery({
    variables: { getChallengeId: challengeId },
  });
  console.log('data', data?.getChallenge);
  const onToggleStatus = (id: string) => {
    console.log('toggle status');
    /*  setActions((prev) =>
      prev.map((action) =>
        action.id === id
          ? { ...action, status: action.status === 'done' ? 'pending' : 'done' }
          : action
      )
    ); */
  };

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-6">
      <ChallengeBanner challengeId={challengeId} />

      <div className="mt-6 flex justify-center">
        <ActionsTabs
          actions={data?.getChallenge.actions || []}
          onToggleStatus={onToggleStatus}
          userActionChallenges={data?.getChallenge.userActionChallenges || []}
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
