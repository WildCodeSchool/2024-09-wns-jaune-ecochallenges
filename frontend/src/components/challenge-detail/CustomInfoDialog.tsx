import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

type InfoDialogProps = {
  title: string;
  description: string;
};

export const CustomInfoDialog = ({ title, description }: InfoDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <Info className="text-muted-foreground h-4 w-4 cursor-pointer" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogClose asChild>
        <Button className="mt-4">Retour</Button>
      </DialogClose>
    </DialogContent>
  </Dialog>
);
