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
  action: Action;
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

const getdifficulty = (
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
      <Card className={cn('h-full')}>
        <CardHeader className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex gap-1">
              {action.tags?.map((tag) => (
                <Pill key={tag.id} className="p-1">
                  {tag.icon}
                </Pill>
              ))}
            </div>

            <Button
              type="button"
              variant="ghost"
              className="hover:bg-transparent hover:opacity-100"
              onClick={onClick}
            >
              {isSelected ? (
                <BookmarkCheck
                  data-testid="action-card-button"
                  className="size-8"
                />
              ) : (
                <BookmarkMinus
                  data-testid="action-card-button"
                  className="size-8"
                />
              )}
            </Button>
          </div>

          <CardTitle className="text-lg font-bold">
            <h2>{action.name}</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{action.description}</CardDescription>
        </CardContent>

        <CardFooter className="flex w-full justify-between gap-1">
          <div className="flex gap-1">
            <Pill>
              <span className="text-base">{action.time}h</span>
            </Pill>
            {getdifficulty(difficulties, action.level).map((difficulty) => (
              <Pill className="flex" key={difficulty.value}>
                <span className="text-xs">niveau:</span>
                <difficulty.icon className={difficulty.className} />
              </Pill>
            ))}
          </div>

          <div>
            <Button
              type="button"
              variant="ghost"
              className="hover:bg-transparent hover:opacity-100"
            >
              <ImagePlus className="size-7" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="hover:bg-transparent hover:opacity-100"
            >
              <Ellipsis className="size-7" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
};
