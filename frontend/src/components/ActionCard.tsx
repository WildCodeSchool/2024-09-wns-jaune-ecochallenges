import { Action } from '@/lib/graphql/generated/graphql-types';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleCheck, CirclePlus, Hourglass, ImagePlus } from 'lucide-react';

type ActionCardProps = {
  readonly action: Action;
  readonly isSelected: boolean;
  readonly onClick: () => void;
};

export const ActionCard = ({
  action,
  isSelected = false,
  onClick,
}: ActionCardProps) => {
  return (
    <Card
      key={action.id}
      className="m-2 flex h-40 justify-center bg-teal-50 p-2 xl:w-1/5"
    >
      <div className="flex">
        <img
          src={`/icons/${action.icon}.png`}
          alt="name"
          className="w-1/7 object-contain"
        />
        <div className="flex w-full flex-col">
          <CardHeader className="mb-3 flex flex-col text-left">
            <CardTitle className="w-full">{action.name}</CardTitle>
            <CardDescription className="w-full">
              {action.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex w-full justify-around">
            <Button type="button" variant="ghost" className="cursor-pointer">
              <ImagePlus
                className=""
                style={{ minWidth: '30px', minHeight: '30px' }}
              />
            </Button>
            <img
              className="w-10"
              src={`/icons/level-${action.level}.png`}
              alt="icon of dificulty level"
            />

            <div className="flex items-center justify-center">
              <p className="text-2xl">{action.time}h</p>
              <Hourglass className="" size={25} />
            </div>
          </CardFooter>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={onClick}
          className="m-auto cursor-pointer"
        >
          {isSelected ? (
            <CircleCheck className="size-8 fill-slate-300" />
          ) : (
            <CirclePlus className="size-8" />
          )}
        </Button>
      </div>
    </Card>
  );
};
