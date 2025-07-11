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
  isAuthorized: boolean | undefined;
  userId: string | undefined;
  challengeId: string;
};

export const ActionsTabs = ({
  actions,
  userActionChallengeScore,
  isAuthorized,
  userId,
  challengeId,
}: Props) => {
  const toCheck = userActionChallengeScore.filter(
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
            userActionChallengeScore={userActionChallengeScore}
          />
        </TabsContent>

        <TabsContent value="fil">
          <ChallengeFeed userActionChallengeScore={userActionChallengeScore} />
        </TabsContent>
        <TabsContent value="tocheck">
          <PendingTabs toCheck={toCheck} challengeId={challengeId} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
