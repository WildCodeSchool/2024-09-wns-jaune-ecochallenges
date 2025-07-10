import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChallengeActionsList } from './ChallengeActionsList';
import {
  Action,
  UserActionChallenge,
} from '@/lib/graphql/generated/graphql-types';
import { ChallengeFeed } from './ChallengeFeed';
import { StatusEnum } from '@/lib/enums';
import { PendingTabs } from './ActionsTabs/PendingTabs';
import { Hourglass, Leaf, Newspaper } from 'lucide-react';

type Props = {
  actions: Partial<Action>[];
  userActionChallenges: Partial<UserActionChallenge>[];
  isAuthorized: boolean | undefined;
  userId: string | undefined;
  challengeId: string;
  refetchChallengeData: () => void;
};

export const ActionsTabs = ({
  actions,
  userActionChallenges,
  isAuthorized,
  userId,
  challengeId,
  refetchChallengeData,
}: Props) => {
  const toCheck = userActionChallenges.filter(
    (userActionChallenge) => userActionChallenge.status === StatusEnum.PENDING
  );

  return (
    <Tabs defaultValue="gestes" className="w-full md:max-w-4xl lg:max-w-5xl">
      <TabsList className="grid w-full grid-cols-3 gap-2">
        <TabsTrigger className="bg-sidebar" value="gestes">
          {userId ? (
            <>
              <Leaf className="h-4 w-4" /> Mes gestes
            </>
          ) : (
            <>
              <Leaf className="h-4 w-4" /> Les eco gestes
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
            isAuthorized={isAuthorized}
            userId={userId}
            actions={actions}
            userActionChallenges={userActionChallenges}
          />
        </TabsContent>

        <TabsContent value="fil">
          <ChallengeFeed userActionChallenges={userActionChallenges} />
        </TabsContent>
        <TabsContent value="tocheck">
          <PendingTabs
            toCheck={toCheck}
            challengeId={challengeId}
            refetchChallengeData={refetchChallengeData}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};
