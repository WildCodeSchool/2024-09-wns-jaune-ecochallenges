import { CarouselComponent, MyUserCard, ChallengeCard } from '@/components';
import { GET_USER_BY_ID, GET_CHALLENGES } from '@/lib/graphql/operations';
import { useUserStore } from '@/lib/zustand/userStore';
import { useQuery } from '@apollo/client';

export const Home = () => {
  const isAuth = useUserStore((state) => !!state.user);
  const userId = useUserStore((state) => state.user?.id);

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId,
  });
  const {
    data: challengesData,
    loading: challengesLoading,
    error: challengesError,
  } = useQuery(GET_CHALLENGES, {});
  const now = new Date();

  const challenges = (challengesData?.getChallenges ?? [])
    .filter(
      (challenge: { endDate: string; members: { id: string }[] }) =>
        new Date(challenge.endDate) >= now &&
        !challenge.members.some((member) => member.id === userId)
    )
    .slice(0, 7);

  if (loading || challengesLoading) {
    return <p>Chargement...</p>;
  }

  if (error || challengesError) {
    return (
      <p>
        Erreur : {error?.message || ''} {challengesError?.message || ''}
      </p>
    );
  }

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

      {challenges.length === 0 ? (
        <p>Aucun challenge à afficher</p>
      ) : (
        <CarouselComponent data={challenges} CardComponent={ChallengeCard} />
      )}
    </>
  );
};
