import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChallengeActionsList } from './ChallengeActionsList';

export type ActionLite = {
  id: string;
  name: string;
  description: string;
  status: 'done' | 'pending';
  tags?: { name: string }[] | null;
  icon: string;
};

type Props = {
  actions: ActionLite[];
  onToggleStatus: (id: string) => void;
};

export const ActionsTabs = ({ actions, onToggleStatus }: Props) => {
  const gestes = actions;
  const fil = actions.filter((action) => action.status === 'done');
  const tocheck = actions.filter((action) => action.status === 'pending');

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
          />
        </TabsContent>
        <TabsContent value="fil">
          <ChallengeActionsList actions={fil} onToggleStatus={onToggleStatus} />
        </TabsContent>
        <TabsContent value="tocheck">
          <ChallengeActionsList
            actions={tocheck}
            onToggleStatus={onToggleStatus}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};
