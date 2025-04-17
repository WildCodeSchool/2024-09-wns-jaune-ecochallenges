import {
  ChallengeDetailHeader,
  ChallengeDetailTabs,
  ActionList,
} from '@/components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const ChallengeDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'gestes' | 'fil' | 'check'>(
    'gestes'
  );

  const fakeActions = [
    {
      id: '1',
      title: 'Éteindre les lumières inutiles',
      description:
        'Pensez à éteindre les lumières quand vous quittez une pièce.',
      tag: '💡 energy',
    },
    {
      id: '2',
      title: 'Prendre les transports en commun',
      description: 'Utilisez les transports en commun plutôt que la voiture.',
      tag: '🚗 transport',
    },
    {
      id: '3',
      title: 'Manger végétarien un jour par semaine',
      description:
        'Réduisez votre empreinte carbone avec des repas sans viande.',
      tag: '🥦 food',
    },
    {
      id: '4',
      title: 'Recycler correctement les déchets',
      description: 'Triez le plastique, le papier, le verre et les biodéchets.',
      tag: '🗑️ waste',
    },
    {
      id: '5',
      title: 'Prendre des douches plus courtes',
      description: 'Réduisez la durée de vos douches pour économiser de l’eau.',
      tag: '💧 water',
    },
    {
      id: '6',
      title: 'Débrancher les appareils en veille',
      description:
        'Coupez l’alimentation des appareils inutilisés pour économiser de l’énergie.',
      tag: '💡 energy',
    },
    {
      id: '7',
      title: 'Utiliser une gourde',
      description:
        'Évitez les bouteilles en plastique en utilisant une gourde réutilisable.',
      tag: '🗑️ waste',
    },
  ];

  return (
    <div className="space-y-4 p-4">
      <ChallengeDetailHeader />
      <ChallengeDetailTabs active={activeTab} setActive={setActiveTab} />

      {activeTab === 'gestes' && <ActionList actions={fakeActions} />}
      {activeTab === 'fil' && <p>📰 Fil du challenge (à venir)</p>}
      {activeTab === 'check' && <p>✅ To check (à venir)</p>}
    </div>
  );
};
