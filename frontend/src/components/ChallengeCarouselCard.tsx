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
  name: string;
  description: string;
  tags: string[];
}

interface ChallengeCarouselCardProps {
  item: IChallenge;
  index: number;
}

export const ChallengeCarouselCard = ({
  item,
  index,
}: ChallengeCarouselCardProps) => {
  return (
    <Card key={index} className="border-red m-0 flex flex-row gap-0 p-0">
      <img
        key={index}
        className="aspect-square max-w-1/3 bg-[#8FA99E]"
        src="./images/sample.jpg"
        alt={item.name}
      />

      <CardContent className="flex aspect-video flex-col justify-around bg-[#8FA99E] p-0 pt-1 pl-3 text-white">
        <CardTitle className="my-3 text-left">{item.name}</CardTitle>
        <CardHeader className="mb-3 flex flex-row gap-2 p-0 text-xs">
          {item.tags.slice(0, 2).map((tag) => (
            <Pill className="px-1 py-3 text-[#222725]" key={tag}>
              {tag}
            </Pill>
          ))}
          {item.tags.length > 2 && (
            <Pill className="p-3 text-[#222725]">+{item.tags.length - 2} </Pill>
          )}
        </CardHeader>

        <CardDescription className="text-white">
          {item.description}
        </CardDescription>
        <CardFooter>
          <Button className="mx-auto bg-amber-600">Join this challenge</Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
