import { ChallengeCard } from '@/components';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from '@/components/ui';
import { useGetChallengesAsChallengeQuery } from '@/lib/graphql/generated/graphql-types';
import { useUserStore } from '@/lib/zustand/userStore';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ChallengeList = () => {
  const user = useUserStore((state) => state.user);
  const { data, loading, error } = useGetChallengesAsChallengeQuery();

  if (!data?.getChallenges) return <p>No challenges found</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sortedChallenges = [...data.getChallenges].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const { managedChallenges, participatedChallenges, openChallenges } =
    sortedChallenges.reduce(
      (acc, challenge) => {
        const isOwnerOrAdmin =
          challenge.owner?.id === user?.id || user?.role === 'admin';
        const isMember = challenge.members.some(
          (member) => member.id === user?.id
        );

        if (isOwnerOrAdmin) {
          acc.managedChallenges.push(challenge);
        } else if (isMember) {
          acc.participatedChallenges.push(challenge);
        } else if (challenge.isPublic) {
          acc.openChallenges.push(challenge);
        }

        return acc;
      },
      {
        managedChallenges: [] as typeof sortedChallenges,
        participatedChallenges: [] as typeof sortedChallenges,
        openChallenges: [] as typeof sortedChallenges,
      }
    );

  return (
    <>
      <Accordion
        type="multiple"
        defaultValue={['managed', 'participated', 'open']}
      >
        {user && (
          <>
            <AccordionItem value="managed">
              <AccordionTrigger disabled={managedChallenges.length === 0}>
                🛠️ Challenges gérés
              </AccordionTrigger>
              {managedChallenges.length > 0 && (
                <AccordionContent>
                  <ul className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
                    {managedChallenges.map((challenge) => (
                      <li key={challenge.id}>
                        <ChallengeCard
                          key={challenge.id}
                          challenge={challenge}
                        />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              )}
            </AccordionItem>
            <AccordionItem value="participated">
              <AccordionTrigger disabled={participatedChallenges.length === 0}>
                🏃 Challenges auxquels je participe
              </AccordionTrigger>
              {participatedChallenges.length > 0 && (
                <AccordionContent>
                  <ul className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
                    {participatedChallenges.map((challenge) => (
                      <li key={challenge.id}>
                        <ChallengeCard
                          key={challenge.id}
                          challenge={challenge}
                        />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              )}
            </AccordionItem>
          </>
        )}
        <AccordionItem value="open">
          <AccordionTrigger disabled={openChallenges.length === 0 || !user}>
            🌐 Challenges publics
          </AccordionTrigger>
          {openChallenges.length > 0 && (
            <AccordionContent>
              <ul className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
                {openChallenges.map((challenge) => (
                  <li key={challenge.id}>
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>

      {user && (
        <Button
          asChild
          variant="default"
          className="fixed right-4 bottom-8 z-50 size-14 rounded-full shadow-md shadow-black/50"
        >
          <Link to="/challenge/new">
            <Plus className="size-10" strokeWidth={1.4} />
          </Link>
        </Button>
      )}
    </>
  );
};
