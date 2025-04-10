import { ChallengeCarouselCard, CarouselComponent } from '@/components';

export const Home = () => {
  const ecoChallenges = [
    {
      id: '1',
      name: 'No Plastic Week',
      imageUrl:
        'https://images.pexels.com/photos/256221/pexels-photo-256221.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Lina', 'Matthieu', 'Sophie'],
      description:
        'Évitez les plastiques à usage unique pendant 7 jours. Apportez vos propres sacs, bouteilles et contenants !',
      tags: ['sans plastique', 'zéro déchet', 'mode de vie durable'],
    },
    {
      id: '2',
      name: 'Aller au travail à vélo',
      imageUrl:
        'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Thomas', 'Nina', 'Léo'],
      description:
        'Laissez la voiture au garage et prenez le vélo pour aller au travail ou à l’école tous les jours cette semaine.',
      tags: ['transport écologique', 'réduction des émissions', 'vélo'],
    },
    {
      id: '3',
      name: 'Journée Végétarienne',
      imageUrl:
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Claire', 'Maxime', 'Alice'],
      description:
        'Ne mangez pas de viande pendant une journée pour réduire votre empreinte carbone.',
      tags: ['à base de plantes', 'basse émission', 'alimentation saine'],
    },
    {
      id: '4',
      name: 'Nettoyage de Quartier',
      imageUrl:
        'https://images.pexels.com/photos/3187291/pexels-photo-3187291.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Julien', 'Emma', 'Yasmine'],
      description:
        'Rejoignez vos voisins pour ramasser les déchets dans votre parc ou rue.',
      tags: ['communauté', 'ramassage de déchets', 'plein air'],
    },
    {
      id: '5',
      name: 'Défi Douche Froide',
      imageUrl:
        'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Lucas', 'Camille', 'Jade'],
      description:
        'Prenez uniquement des douches froides de 3 minutes pendant une semaine pour économiser l’eau et l’énergie.',
      tags: ['économie d’eau', 'efficacité énergétique', 'pleine conscience'],
    },
  ];

  return (
    <>
      <h1 className="mb-8 rounded-full text-center text-3xl font-thin">
        🌱 Bienvenue sur Eco-challenges 🌱
      </h1>
      <CarouselComponent
        data={ecoChallenges}
        CardComponent={ChallengeCarouselCard}
      />
    </>
  );
};
