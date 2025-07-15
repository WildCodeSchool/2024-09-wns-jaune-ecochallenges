import {
  Button,
  DialogFooter,
  DialogHeader,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Check, ScanEye, X } from 'lucide-react';
import { GET_ACTIONS_BY_CHALLENGE_ID_WITH_STATUS } from '@/lib/graphql/operations';
import { toast } from 'sonner';
import { StatusEnum } from '@/lib/enums/action.status.enum';
import { useUserStore } from '@/lib/zustand/userStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type Props = {
  toCheck: Partial<UserActionChallengeScore>[];
  challengeId: string;
  isChallengeOwner: boolean | undefined;
  isAdmin: boolean | undefined;
};

export const PendingTabs = ({
  toCheck,
  challengeId,
  isChallengeOwner,
  isAdmin,
}: Props) => {
  const user = useUserStore((state) => state.user);
  const [updateUserActionChallengeScoreMutation] =
    useUpdateUserActionChallengeScoreMutation({
      refetchQueries: [
        {
          query: GET_ACTIONS_BY_CHALLENGE_ID_WITH_STATUS,
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
      <h1 className="mb-4 text-xl">Actions à valider :</h1>
      {toCheck
        .filter((action) => action.status === StatusEnum.PENDING)
        .map((action) => (
          <div key={action.action?.id} className="flex flex-col gap-4">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>
                  🌿 Action de {action.validatedFor?.firstname} :
                </CardTitle>
                <CardDescription>
                  Completée en date du{' '}
                  {format(new Date(action.createdAt), 'PPP', { locale: fr })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p>
                  Est en attente de validation pour l'eco geste:{' '}
                  <span className="font-bold">{action.action?.name}</span>
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    {!isAdmin && !isChallengeOwner ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <Button disabled={!isAdmin && !isChallengeOwner}>
                            <ScanEye /> Vérifier son action
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Vous n'avez pas les autorisations pour valider cette
                            action
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Button>
                        <ScanEye /> Vérifier son action
                      </Button>
                    )}
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
                          className="hover:bg-destructive/50 bg-destructive/60"
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
                          className="hover:bg-green-600/50"
                          onClick={() =>
                            setApprouvalStatus(action, StatusEnum.COMPLETED)
                          }
                        >
                          <Check className="h-4 w-4" />
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
