import { Pill } from '@/components';
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui';
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  useCreateUserActionChallengeMutation,
  type Action,
} from '@/lib/graphql/generated/graphql-types'; // le vrai type

export type ActionLite = {
  id: string;
  name: string;
  description: string;
  tags?: { name: string }[] | null;
  // ajoute ici uniquement ce que tu utilises dans le composant
};

// type Props = {
//   action: ActionLite;
// };

type Props = {
  action: Omit<Action, 'challenges'> & { status: 'done' | 'pending' };
  challengeId: string;
  onToggleStatus: (id: string) => void;
};

export const ChallengeActionCard = ({ action, onToggleStatus }: Props) => {
  const [createUserActionChallengeMutation] =
    useCreateUserActionChallengeMutation();

  const validateAction = async (action: Omit<Action, 'challenges'>) => {
    console.log(action);
    try {
      const currentAction = {
        userId: '9c9681fa-c9c3-44cb-b243-52db3223ede2',
        actionId: '1',
        challengeId: '11',
        status: 'not_started',
      };
      const { data } = await createUserActionChallengeMutation({
        variables: { data: currentAction },
      });
      if (!data?.createUserActionChallenge) {
        throw new Error('Failed to validate action');
      }
      onToggleStatus(action.id);
    } catch (error) {
      console.error(error);
    }
  };

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
        <Dialog>
          <DialogTrigger>
            <Checkbox
              className="h-8 w-8 rounded-full border-3"
              checked={isChecked}
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Valider un eco-geste</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Attention, cette action est marquée comme faite. vous ne pourrez
              plus la modifier. N'oubliez pas qu'il s'agit d'un jeu et que nous
              comptons sur votre bonne foi pour valider les eco-gestes sans
              abus.
            </DialogDescription>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" aria-label="Annuler">
                  Annuler
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => validateAction(action)}
                  type="button"
                  aria-label="Valider l'eco-geste"
                >
                  Valider l'eco-geste
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
