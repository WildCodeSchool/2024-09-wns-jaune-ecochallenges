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
};

export const ActionsTabs = ({
  actions,
  userActionChallenges,
  isAuthorized,
  userId,
  challengeId,
}: Props) => {
  const gestes = actions;
  return (
    <Tabs defaultValue="gestes" className="w-full md:max-w-4xl lg:max-w-5xl">
      <TabsList className="grid w-full grid-cols-3 gap-2 bg-zinc-400">
        <TabsTrigger className="bg-blue-300" value="gestes">
          Mes gestes
        </TabsTrigger>
        <TabsTrigger className="bg-blue-300" value="fil">
          Fil
        </TabsTrigger>
        <TabsTrigger className="bg-blue-300" value="tocheck">
          To check
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
          <PendingTabs toCheck={toCheck} challengeId={challengeId} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
