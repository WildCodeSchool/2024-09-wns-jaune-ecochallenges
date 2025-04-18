import { Action } from '@/lib/graphql/generated/graphql-types';
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { Pill } from '@/components';
import {
  CirclePlus,
  CircleX,
  Ellipsis,
  Hourglass,
  ImagePlus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ActionCardProps = {
  action: Action;
  isSelected?: boolean;
  onClick?: () => void;
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
      className={cn(
        'bg-linear-to-br from-slate-100 to-slate-200 p-1 transition-colors hover:bg-linear-to-br hover:from-slate-200 hover:to-slate-300 active:bg-linear-to-br active:from-slate-300 active:to-slate-400',
        'm-0 flex h-auto w-[90vw] flex-col sm:h-[20vh] sm:w-[70vw] md:w-[60vw] md:flex-row lg:w-[45vw] xl:w-[35vw] 2xl:w-[30vw]'
      )}
    >
      <div className="w-10 basis-1/6 md:h-25 md:w-25 2xl:p-3">
        <img
          src={`/icons/${action.icon}.png`}
          alt="name"
          className="size-12 object-contain"
        />
      </div>

      <div className="flex basis-3/6 flex-col gap-4 md:justify-around">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="center text-lg font-bold">
            {action.name}
          </CardTitle>
          <CardDescription className="center text-base">
            {action.description}
            <ul className="flex w-full flex-wrap gap-2">
              {action.tags?.map((tag) => (
                <li key={tag.id}>
                  <Pill className="p-2">
                    <span className="mr-1 text-lg">{tag.icon}</span>
                    {tag.name}
                  </Pill>
                </li>
              ))}
            </ul>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-around gap-2">
          <Pill className="p-4">
            <Button
              type="button"
              variant="ghost"
              className="hover:bg-transparent hover:opacity-100"
            >
              <ImagePlus strokeWidth={2} className="min-h-6 min-w-6" />
            </Button>
          </Pill>
          <Pill className="p-4">
            <img
              className="w-7"
              src={`/icons/level-${action.level}.png`}
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
              className="hover:bg-transparent hover:opacity-100"
            >
              <Ellipsis strokeWidth={3} />
            </Button>
          </Pill>
        </CardFooter>
      </div>

      <div className="basis-1/6 md:flex md:items-center md:justify-center">
        <Button
          type="button"
          variant="ghost"
          className="hover:bg-transparent hover:opacity-100"
          onClick={onClick}
        >
          {isSelected ? (
            <CircleX
              data-testid="action-card-button"
              className="size-8 fill-slate-300"
            />
          ) : (
            <CirclePlus data-testid="action-card-button" className="size-8" />
          )}
        </Button>
      </div>
    </Card>
  );
};
