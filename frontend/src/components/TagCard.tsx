import { Tag } from '@/lib/graphql/generated/graphql-types';
import { Button, Card, CardContent } from './ui';
import { CircleCheck, CirclePlus } from 'lucide-react';

export const TagCard = ({
  tag,
  isSelected = false,
  onClick,
}: {
  tag: Tag;
  isSelected?: boolean;
  onClick: () => void;
}) => {
  return (
    <article className="h-full w-full">
      <Card className="h-full">
        <CardContent className="flex items-center justify-between gap-2 p-4">
          <p className="ml-6 text-xl">
            {tag.icon} {tag.name}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="hover:bg-transparent hover:opacity-100"
            onClick={onClick}
          >
            {isSelected ? (
              <CircleCheck
                data-testid="member-card-button"
                className="fill-accent size-8"
              />
            ) : (
              <CirclePlus data-testid="member-card-button" className="size-8" />
            )}
          </Button>
        </CardContent>
      </Card>
    </article>
  );
};
