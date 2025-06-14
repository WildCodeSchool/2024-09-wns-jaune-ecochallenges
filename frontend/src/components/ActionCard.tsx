import {
  GetUserActionsQuery,
  User,
} from '@/lib/graphql/generated/graphql-types';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { Pill } from '@/components';
import {
  BookmarkCheck,
  BookmarkPlus,
  Ellipsis,
  ImagePlus,
  Leaf,
  LucideProps,
  Sprout,
  TreePalm,
} from 'lucide-react';
import { Link } from 'react-router-dom';

type ActionCardProps = {
  action: GetUserActionsQuery['getUserActions'][number];
  isSelected?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  user?: Pick<User, 'id' | 'role'>;
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
    className: 'text-colorcard-foreground  size-6',
  },
  {
    value: 2,
    label: 'Moyen',
    icon: Leaf,
    className: 'text-colorcard-foreground  size-5',
  },
  {
    value: 3,
    label: 'Difficile',
    icon: TreePalm,
    className: 'text-colorcard-foreground  size-6',
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
  onDelete,
  user,
}: ActionCardProps) => {
  const canEditOrDelete =
    user?.role === 'admin' ||
    (user?.role === 'user' && action.createdBy?.id === user.id);
  return (
    <article className="h-full">
      <Card
        data-testid="action-card"
        className={'h-full justify-between gap-2 py-2'}
      >
        <CardHeader className="flex w-full flex-col">
          <CardTitle className="text-lg font-bold">{action.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription>
            <p className="line-clamp-2 max-w-full">{action.description} </p>
            <div className="mt-4 flex w-full flex-row items-center justify-start gap-2">
              {action.tags?.map((tag) => <Pill key={tag.id}>{tag.icon}</Pill>)}
              <Pill>
                <span className="text-md">{action.time} ⌛️</span>
              </Pill>
              <Pill>
                <span className="text-md">{action.points} 🦀</span>
              </Pill>
              {getDifficulty(difficulties, action.level).map((difficulty) => (
                <Pill className="flex" key={difficulty.value}>
                  <span className="text-md mr-1">niveau:</span>
                  <difficulty.icon className={difficulty.className} />
                </Pill>
              ))}
            </div>
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
            {canEditOrDelete && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="m-0 p-0 hover:bg-transparent hover:opacity-100"
                  >
                    <Ellipsis className="size-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link to={`/action/${action.id}/edit`}>
                    <DropdownMenuItem>Editer</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => {
                      onDelete?.();
                    }}
                  >
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button
              size="icon"
              type="button"
              variant="ghost"
              className="hover:bg-transparent hover:opacity-100"
              data-testid="action-card-button"
              onClick={onClick}
            >
              {isSelected ? (
                <BookmarkCheck className="fill-accent size-8" />
              ) : (
                <BookmarkPlus className="size-7" />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
};
