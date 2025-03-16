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
import { Pill } from './Pill';

type ActionCardProps = {
  readonly action: Action;
};

export const ActionCard = ({ action }: ActionCardProps) => {
  return (
    <Card
      key={action.id}
      className="3xl:w-[20vw] flex h-[15vh] w-[96vw] flex-col justify-center bg-teal-50 p-2 lg:flex-row xl:h-[12vh] xl:w-[30vw] 2xl:w-[25vw]"
    >
      {/* // 1er block */}
      <div className="basis-1/6 xl:h-full">
        <img
          src={`./icons/${action.icon}.png`}
          alt="name"
          className="hidden object-contain p-2 lg:inline lg:h-full lg:w-full"
        />
      </div>
      {/* // 2ème block */}
      <div className="flex basis-4/6 flex-col content-evenly gap-4 self-center">
        <CardHeader className="flex flex-col text-left">
          <CardTitle className="text-lg font-bold">{action.name}</CardTitle>
          <CardDescription className="text-base font-bold">
            {action.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-around">
          <Pill className="p-3">
            <Button
              type="button"
              variant="ghost"
              className="cursor-pointer hover:bg-transparent hover:opacity-100"
            >
              <ImagePlus
                strokeWidth={3}
                style={{ minWidth: '25px', minHeight: '25px' }}
              />
            </Button>
          </Pill>
          <Pill className="p-3">
            <img
              className="w-7"
              src={`./icons/level-${action.level}.png`}
              alt="icon of dificulty level"
            />
          </Pill>
          <Pill className="p-3">
            <Hourglass strokeWidth={3} />
            <span className="text-base font-bold">{action.time}h</span>
          </Pill>
          <Pill className="p-3">
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
      <div className="flex basis-1/6 self-center">
        <Button
          type="button"
          variant="ghost"
          className="cursor-pointer hover:bg-transparent hover:opacity-100"
        >
          <CirclePlus
            style={{ minWidth: '45px', minHeight: '45px' }}
            strokeWidth={3}
          />
        </Button>
      </div>
    </Card>
  );
};
