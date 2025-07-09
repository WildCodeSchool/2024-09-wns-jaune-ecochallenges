import { Button, DialogFooter, DialogHeader } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserActionChallenge } from '@/lib/graphql/generated/graphql-types';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScanEye, X } from 'lucide-react';

type Props = {
  toCheck: Partial<UserActionChallenge>[];
};

export const PendingTabs = ({ toCheck }: Props) => {
  console.log('toCheck', toCheck);
  return (
    <div>
      <h1 className="mb-4 text-xl">
        Aidez vos collègues à valider leurs actions !
      </h1>
      {toCheck.map((action) => (
        <div key={action.action?.id} className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{action.user?.firstname}</CardTitle>
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
                    <span className="font-bold">{action.user?.firstname}</span>
                  </DialogTitle>
                  <DialogHeader className="flex flex-col items-center">
                    <img
                      src={action.user?.avatarUrl || ''}
                      alt={action.user?.firstname}
                      className="h-16 w-16 rounded-full"
                    />
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        className="hover:bg-destructive/20"
                      >
                        <X className="text-destructive h-4 w-4" />
                        Refuser
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button>Valider</Button>
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
