import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChallengeActionsList } from '../ChallengeActionsList';
import {
  Action,
  UserActionChallengeScore,
} from '@/lib/graphql/generated/graphql-types';
import { ChallengeFeed } from './ChallengeFeed';
import { StatusEnum } from '@/lib/enums';
import { PendingTabs } from './PendingTabs';
import { Hourglass, Leaf, Newspaper } from 'lucide-react';

type Props = {
  actions: Partial<Action>[];
  userActionChallengeScore: UserActionChallengeScore[];
  isChallengeMember: boolean | undefined;
  isChallengeOwner: boolean | undefined;
  isAdmin: boolean | undefined;
  userId: string | undefined;
  challengeId: string;
};

export const ActionsTabs = ({
  actions,
  userActionChallengeScore,
  isChallengeMember,
  isChallengeOwner,
  isAdmin,
  userId,
  challengeId,
}: Props) => {
  const toCheck = userActionChallengeScore.filter(
    (userActionChallenge) => userActionChallenge.status === StatusEnum.PENDING
  );

  return (
    <Tabs defaultValue="gestes" className="w-full md:max-w-4xl lg:max-w-5xl">
      <TabsList className="grid h-full w-full grid-cols-1 gap-2 md:grid-cols-3">
        <TabsTrigger className="bg-sidebar" value="gestes">
          {isChallengeOwner || isAdmin || !userId ? (
            <>
              <Leaf className="h-4 w-4" /> Les eco gestes
            </>
          ) : (
            <>
              <Leaf className="h-4 w-4" /> Mes gestes
            </>
          )}
        </TabsTrigger>
        <TabsTrigger className="bg-sidebar" value="fil">
          <Newspaper className="h-4 w-4" /> Fil d'actualité
        </TabsTrigger>
        <TabsTrigger className="bg-sidebar" value="tocheck">
          <Hourglass className="h-4 w-4" /> En attente de validation (
          {toCheck.length})
        </TabsTrigger>
      </TabsList>

      <div className="mt-2">
        <TabsContent value="gestes">
          <ChallengeActionsList
            isChallengeMember={isChallengeMember}
            userId={userId}
            actions={actions}
            userActionChallengeScore={userActionChallengeScore}
          />
        </TabsContent>

        <TabsContent value="fil">
          <ChallengeFeed userActionChallengeScore={userActionChallengeScore} />
        </TabsContent>
        <TabsContent value="tocheck">
          <PendingTabs
            toCheck={toCheck}
            challengeId={challengeId}
            isChallengeOwner={isChallengeOwner}
            isAdmin={isAdmin}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};
