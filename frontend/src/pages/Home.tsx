import {
  ChallengeCarouselCard,
  CarouselComponent,
  MyUserCard,
} from '@/components';
import { GET_USER_BY_ID } from '@/lib/graphql/operations';
import { useUserStore } from '@/lib/zustand/userStore';
import { useQuery } from '@apollo/client';

export const Home = () => {
  const isAuth = useUserStore((state) => !!state.user);
  const userId = useUserStore((state) => state.user?.id);

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId,
  });

  const ecoChallenges = [
    {
      id: '1',
      name: 'Sans platique !',
      imageUrl:
        'https://images.pexels.com/photos/256221/pexels-photo-256221.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Lina', 'Matthieu', 'Sophie'],
      description:
        'Évitez les plastiques à usage unique pendant 7 jours. Apportez vos propres sacs, bouteilles et contenants !',
      tags: ['Sans plastique', 'Zéro déchet', 'Durable'],
    },
    {
      id: '2',
      name: 'Aller au travail à vélo',
      imageUrl:
        'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Thomas', 'Nina', 'Léo'],
      description:
        'Laissez la voiture au garage et prenez le vélo pour aller au travail ou à l’école tous les jours cette semaine.',
      tags: ['transport ', 'Basses émissions', 'vélo'],
    },
    {
      id: '3',
      name: 'Journée Végétarienne',
      imageUrl:
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Claire', 'Maxime', 'Alice'],
      description:
        'Ne mangez pas de viande pendant une journée pour réduire votre empreinte carbone.',
      tags: ['Plantes', 'Basses émissions', 'Alimentation'],
    },
    {
      id: '4',
      name: 'Nettoyage de Quartier',
      imageUrl:
        'https://images.pexels.com/photos/3187291/pexels-photo-3187291.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Julien', 'Emma', 'Yasmine'],
      description:
        'Rejoignez vos voisins pour ramasser les déchets dans votre parc ou rue.',
      tags: ['Communauté', 'Déchets', 'plein air'],
    },
    {
      id: '5',
      name: 'Défi Douche Froide',
      imageUrl:
        'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&h=600',
      users: ['Lucas', 'Camille', 'Jade'],
      description:
        'Prenez uniquement des douches froides de 3 minutes pendant une semaine pour économiser l’eau et l’énergie.',
      tags: ['Eau', 'Efficacité énergétique', 'Conscience'],
    },
  ];

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const user = data?.getCurrentUser;

  return (
    <>
      <h1 className="mb-8 rounded-full text-center text-3xl font-thin">
        🌱 Bienvenue sur Eco-challenges 🌱
      </h1>

      {isAuth && (
        <MyUserCard
          id={user.id}
          bernardPoints={0}
          nbActions={0}
          nbChallenges={user.participatedChallenges?.length || 0}
          picture={user.avatarUrl || '/public/icons/leaf.png'}
          pictureName={`${user.firstname} ${user.lastname}`}
        />
      )}

      <CarouselComponent
        data={ecoChallenges}
        CardComponent={ChallengeCarouselCard}
      />
    </>
  );
};
