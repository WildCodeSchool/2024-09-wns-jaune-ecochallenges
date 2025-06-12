import { Button } from './ui/button';
import { Dialog, DialogTrigger } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './ui/dialog';
import {
  Action,
  useCreateUserActionChallengeMutation,
} from '@/lib/graphql/generated/graphql-types';
import { toast } from 'sonner';

type ValidateActionDialogProps = {
  isChecked: boolean;
  action: Omit<Action, 'challenges'>;
};

export const ValidateActionDialog = ({
  isChecked,
  action,
}: ValidateActionDialogProps) => {
  const [createUserActionChallengeMutation] =
    useCreateUserActionChallengeMutation();

  const validateAction = async (action: Omit<Action, 'challenges'>) => {
    console.log(action);
    try {
      const currentAction = {
        userId: '9c9681fa-c9c3-44cb-b243-52db3223ede2',
        actionId: '2',
        challengeId: '11',
        status: 'completed',
      };
      const { data } = await createUserActionChallengeMutation({
        variables: { data: currentAction },
      });
      if (!data?.createUserActionChallenge) {
        throw new Error('Failed to validate action');
      }
      toast.success('Eco-geste validé !');
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la validation de l'action");
    }
  };

  return (
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
          En validant cette action, vous confirmez avoir réalisé cet éco-geste.
          Cette validation est définitive et ne pourra pas être modifiée. Nous
          vous remercions de votre honnêteté dans la validation de vos actions.
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
  );
};
