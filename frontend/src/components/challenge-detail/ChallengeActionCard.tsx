import { Pill } from '@/components';

import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Action } from '@/lib/graphql/generated/graphql-types'; // le vrai type
import { ValidateActionDialog } from '../ValidateActionDialog';

type Props = {
  action: Omit<Action, 'challenges'> & { status: 'done' | 'pending' };
  challengeId: string;
  onToggleStatus: (id: string) => void;
};

export const ChallengeActionCard = ({ action }: Props) => {
  const isChecked = action.status === 'done';

  return (
    <Card className="flex-row items-center justify-between gap-2 rounded-lg border bg-white p-3 shadow-sm">
      <div className="px-2">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt={action.name} />
          <AvatarFallback>{action.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>

      <CardContent className="gap-2 p-0">
        <CardTitle className="text-xs">{action.name}</CardTitle>

        <div className="flex items-center justify-between gap-2 py-2">
          <Pill>{action.tags?.[0]?.name || 'Sans tag'}</Pill>
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            <span className="h-2 w-2 rounded-full bg-gray-300" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-2">
        <ValidateActionDialog isChecked={isChecked} action={action} />
      </CardFooter>
    </Card>
  );
};
