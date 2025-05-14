import { Action } from '@/lib/graphql/generated/graphql-types';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { Pill } from '@/components';
import {
  BookmarkCheck,
  BookmarkMinus,
  Ellipsis,
  ImagePlus,
  Leaf,
  LucideProps,
  Sprout,
  TreePalm,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ActionCardProps = {
  action: Omit<Action, 'challenges'>;
  isSelected?: boolean;
  onClick?: () => void;
};

type dfficultyProps = {
  value: number;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  className: string;
};

export const difficulties = [
  {
    value: 1,
    label: 'Facile',
    icon: Sprout,
    className: 'text-colorcard-foreground  size-7',
  },
  {
    value: 2,
    label: 'Moyen',
    icon: Leaf,
    className: 'text-colorcard-foreground  size-6',
  },
  {
    value: 3,
    label: 'Difficile',
    icon: TreePalm,
    className: 'text-colorcard-foreground  size-7',
  },
] as const;

const getDifficulty = (
  difficulties: readonly dfficultyProps[],
  value: number
) => {
  const result = difficulties.filter(
    (difficulty: dfficultyProps) => difficulty.value === value
  );
  return result;
};

export const ActionCard = ({
  action,
  isSelected = false,
  onClick,
}: ActionCardProps) => {
  return (
    <article className="h-full">
      <Card className={cn('h-full gap-4 py-2')}>
        <CardHeader className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex gap-4">
              {action.tags?.map((tag) => (
                <Pill key={tag.id} className="p-1">
                  {tag.icon}
                </Pill>
              ))}
            </div>

            <Button
              size="icon"
              type="button"
              variant="ghost"
              className="hover:bg-transparent hover:opacity-100"
              onClick={onClick}
            >
              {isSelected ? (
                <BookmarkCheck
                  data-testid="action-card-button"
                  className="size-7"
                />
              ) : (
                <BookmarkMinus
                  data-testid="action-card-button"
                  className="size-7"
                />
              )}
            </Button>
          </div>

          <CardTitle className="text-lg font-bold">
            <h2>{action.name}</h2>
            <div className="mt-1 flex gap-4">
              <Pill>
                <span className="text-base">{action.time}h</span>
              </Pill>
              {getDifficulty(difficulties, action.level).map((difficulty) => (
                <Pill className="flex" key={difficulty.value}>
                  <span className="mr-1 text-xs">niveau:</span>
                  <difficulty.icon className={difficulty.className} />
                </Pill>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <p className="max-w-full truncate">{action.description} </p>
          </CardDescription>
        </CardContent>

        <CardFooter className="flex w-full justify-between px-2">
          <div className="w-full text-end">
            <Button
              type="button"
              variant="ghost"
              className="m-0 p-0 hover:bg-transparent hover:opacity-100"
            >
              <ImagePlus className="size-6" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="m-0 p-0 hover:bg-transparent hover:opacity-100"
            >
              <Ellipsis className="size-6" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
};
