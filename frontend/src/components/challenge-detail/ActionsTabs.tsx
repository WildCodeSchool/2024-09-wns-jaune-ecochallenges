import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChallengeActionsList } from './ChallengeActionsList';
import {
  Action,
  UserActionChallenge,
} from '@/lib/graphql/generated/graphql-types';

/* export type ActionLite = {
  id: string;
  name: string;
  description: string;
  status: 'done' | 'pending';
  tags?: { name: string }[] | null;
  icon: string;
}; */

type Props = {
  actions: Partial<Action>[];
  onToggleStatus: (id: string) => void;
  userActionChallenges: Partial<UserActionChallenge>[];
};

export const ActionsTabs = ({
  actions,
  onToggleStatus,
  userActionChallenges,
}: Props) => {
  const gestes = actions;
  console.log('gestes', gestes);
  /*   const fil = actions.filter((action) => action.status === 'done');
  const tocheck = actions.filter((action) => action.status === 'pending'); */

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
            actions={gestes}
            onToggleStatus={onToggleStatus}
            userActionChallenges={userActionChallenges}
          />
        </TabsContent>
        <TabsContent value="fil">
          <ChallengeActionsList
            actions={gestes}
            onToggleStatus={onToggleStatus}
          />
        </TabsContent>
        <TabsContent value="tocheck">
          <ChallengeActionsList
            actions={gestes}
            onToggleStatus={onToggleStatus}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};
