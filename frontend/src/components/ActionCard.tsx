import { Action } from '@/lib/graphql/generated/graphql-types';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CirclePlus, Ellipsis, Hourglass, ImagePlus } from 'lucide-react';
import { Pill } from '@/components';

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
      data-testid="action-card"
      key={action.id}
      className="m-0 flex h-auto w-[90vw] flex-col bg-teal-50 p-1 sm:h-[20vh] sm:w-[70vw] md:w-[60vw] md:flex-row lg:w-[45vw] xl:w-[35vw] 2xl:w-[30vw]"
    >
      {/* // 1er block */}
      <div className="flex w-10 basis-1/6 md:h-25 md:w-25 2xl:p-3">
        <img
          src={`/icons/${action.icon}.png`}
          alt="name"
          className="object-contain"
        />
      </div>
      {/* // 2ème block */}
      <div className="flex basis-3/6 flex-col gap-4 md:justify-around">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="center text-lg font-bold">
            {action.name}
          </CardTitle>
          <CardDescription className="center text-base">
            {action.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-around gap-2">
          <Pill className="p-4">
            <Button
              type="button"
              variant="ghost"
              className="cursor-pointer hover:bg-transparent hover:opacity-100"
            >
              <ImagePlus
                strokeWidth={2}
                style={{ minWidth: '25px', minHeight: '25px' }}
              />
            </Button>
          </Pill>
          <Pill className="p-4">
            <img
              className="w-7"
              src={`./icons/level-${action.level}.png`}
              alt="icon of dificulty level"
            />
          </Pill>
          <Pill className="p-4">
            <Hourglass strokeWidth={3} />
            <span className="text-base font-bold">{action.time}h</span>
          </Pill>
          <Pill className="p-4">
            <Button
              type="button"
              variant="ghost"
              className="cursor-pointer hover:bg-transparent hover:opacity-100"
            >
              <Ellipsis strokeWidth={3} />
            </Button>
          </Pill>
        </CardFooter>
      </div>
      {/* // 3ème block */}
      <div className="basis-1/6 md:flex md:items-center md:justify-center">
        <Button
          type="button"
          variant="ghost"
          className="cursor-pointer hover:bg-transparent hover:opacity-100"
        >
          <CirclePlus
            data-testid="circle-plus"
            style={{ minWidth: '50px', minHeight: '50px' }}
            strokeWidth={3}
          />
        </Button>
      </div>
    </Card>
  );
};

// {isSelected ? (
//   <CircleCheck className="size-8 fill-slate-300" />
// ) : (
//   <CirclePlus className="size-8" />
// )}
