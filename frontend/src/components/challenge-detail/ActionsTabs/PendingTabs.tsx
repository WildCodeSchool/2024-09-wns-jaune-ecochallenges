import { Button, DialogFooter, DialogHeader } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  UserActionChallengeScore,
  useUpdateUserActionChallengeScoreMutation,
} from '@/lib/graphql/generated/graphql-types';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScanEye, X } from 'lucide-react';
import { GET_USER_ACTION_CHALLENGE_BY_CHALLENGE_ID } from '@/lib/graphql/operations';
import { toast } from 'sonner';
import { StatusEnum } from '@/lib/enums/action.status.enum';
import { useUserStore } from '@/lib/zustand/userStore';

type Props = {
  toCheck: Partial<UserActionChallengeScore>[];
  challengeId: string;
};

export const PendingTabs = ({ toCheck, challengeId }: Props) => {
  const user = useUserStore((state) => state.user);
  const [updateUserActionChallengeScoreMutation] =
    useUpdateUserActionChallengeScoreMutation({
      refetchQueries: [
        {
          query: GET_USER_ACTION_CHALLENGE_BY_CHALLENGE_ID,
          variables: { getChallengeId: challengeId },
        },
      ],
      onCompleted: () => {
        toast.success('Review realisée avec succès');
      },
      onError: () => {
        toast.error("Erreur lors de la validation de l'action");
      },
    });

  const setApprouvalStatus = async (
    action: Partial<UserActionChallengeScore>,
    status: StatusEnum
  ) => {
    if (
      !action.action?.id ||
      !challengeId ||
      !action.validatedFor?.id ||
      !user?.id
    ) {
      throw new Error('Missing required fields');
    }
    const currentAction = {
      actionId: action.action?.id,
      challengeId,
      status: status,
      comment: action.comment || '',
      validatedFor: action.validatedFor.id,
    };
    const { data } = await updateUserActionChallengeScoreMutation({
      variables: {
        data: currentAction,
      },
    });
    if (!data?.updateUserActionChallengeScore) {
      throw new Error('Failed to validate action');
    }
  };
  return (
    <div>
      <h1 className="mb-4 text-xl">
        Aidez vos collègues à valider leurs actions !
      </h1>
      {toCheck
        .filter((action) => action.status === StatusEnum.PENDING)
        .map((action) => (
          <div key={action.action?.id} className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{action.validatedFor?.firstname}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p>
                  Est en attente de validation pour l'eco geste:{' '}
                  <span className="font-bold">{action.action?.name}</span>
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <ScanEye /> Vérifier son action
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="font-normal">
                      Valider la photo de:{' '}
                      <span className="font-bold">
                        {action.validatedFor?.firstname}
                      </span>
                    </DialogTitle>
                    <DialogHeader className="flex flex-col items-center">
                      <img
                        src={action.validatedFor?.avatarUrl || ''}
                        alt={action.validatedFor?.firstname}
                        className="h-16 w-16 rounded-full"
                      />
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          variant="ghost"
                          className="hover:bg-destructive/20"
                          onClick={() =>
                            setApprouvalStatus(action, StatusEnum.REJECTED)
                          }
                        >
                          <X className="text-destructive h-4 w-4" />
                          Refuser
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          onClick={() =>
                            setApprouvalStatus(action, StatusEnum.COMPLETED)
                          }
                        >
                          Valider
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        ))}
    </div>
  );
};
