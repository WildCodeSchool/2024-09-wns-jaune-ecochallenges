import { useEffect, useState } from 'react';
import { Pill } from './Pill';
import { Button } from './ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

import { Card } from './ui/card';

interface IChallenge {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

type ChallengeCarouselCardProps = {
  readonly item: IChallenge;
};

export const ChallengeCarouselCard = ({ item }: ChallengeCarouselCardProps) => {
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
      data-testid={`card-${item.id}`}
      key={item.id}
      className="m-0 flex flex-row gap-0 p-0"
    >
      <img
        data-testid="card-image"
        key={item.id}
        className="aspect-square max-w-1/3"
        src="./images/sample.jpg"
        alt={item.name}
      />

      <CardContent className="flex flex-col justify-around p-0 pt-1 pl-3">
        <CardTitle data-testid="card-title" className="my-3 text-left">
          {item.name}
        </CardTitle>
        <CardHeader className="mb-3 flex flex-row gap-2 p-0 text-xs">
          {item.tags.slice(0, maxVisibleTags).map((tag) => (
            <Pill data-testid="pills" className="px-1 py-3" key={tag}>
              {tag}
            </Pill>
          ))}
          {item.tags.length > maxVisibleTags && (
            <Pill data-testid="tag-more" className="p-3">
              +{item.tags.length - maxVisibleTags}
            </Pill>
          )}
        </CardHeader>

        <CardDescription
          data-testid="card-description"
          className="text-textColor"
        >
          {item.description}
        </CardDescription>
        <CardFooter>
          <Button
            data-testid="card-button"
            size={'sm'}
            className="hover:bg-accent text-background mx-auto"
          >
            Rejoindre ce challenge
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
