import { useEffect, useState } from 'react';
import { Pill } from '@/components/Pill';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';

type ChallengeCarouselCardProps = {
  id: string;
  name: string;
  description: string;
  tags: string[];
};

export const ChallengeCarouselCard = ({
  id,
  name,
  description,
  tags,
}: ChallengeCarouselCardProps) => {
  const [maxVisibleTags, setMaxVisibleTags] = useState(2);

  useEffect(() => {
    const updateMaxTags = () => {
      if (window.innerWidth < 450) {
        setMaxVisibleTags(1);
      } else {
        setMaxVisibleTags(2);
      }
    };
    updateMaxTags();

    window.addEventListener('resize', updateMaxTags);
    return () => window.removeEventListener('resize', updateMaxTags);
  }, []);

  return (
    <Card
      data-testid={`card-${id}`}
      key={id}
      className="m-0 flex flex-row gap-0 p-0"
    >
      <img
        data-testid="card-image"
        key={id}
        className="aspect-square max-w-1/3"
        src="./images/sample.jpg"
        alt={name}
      />

      <CardContent className="flex flex-col justify-around p-0 pt-1 pl-3">
        <CardTitle data-testid="card-title" className="my-3 text-left">
          {name}
        </CardTitle>
        <CardHeader className="mb-3 flex flex-row gap-2 p-0 text-xs">
          {tags.slice(0, maxVisibleTags).map((tag) => (
            <Pill data-testid="pills" key={tag}>
              {tag}
            </Pill>
          ))}
          {tags.length > maxVisibleTags && (
            <Pill data-testid="tag-more" className="p-3">
              +{tags.length - maxVisibleTags}
            </Pill>
          )}
        </CardHeader>

        <CardDescription data-testid="card-description">
          {description}
        </CardDescription>
        <CardFooter>
          <Button data-testid="card-button" size={'sm'} className="mx-auto">
            Rejoindre ce challenge
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
