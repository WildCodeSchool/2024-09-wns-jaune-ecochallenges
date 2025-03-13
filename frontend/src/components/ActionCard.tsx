import { Action } from '@/lib/graphql/generated/graphql-types';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function ActionCard(action: Action) {
  console.log('🚀 ~ ActionCard ~ action:', action);
  return (
    <Card key={action.id} className="m-2 w-1/6 bg-teal-50">
      <div className="flex justify-center gap-6">
        <img
          src={`./icons/${action.icon}.png`}
          alt="name"
          className="w-1/6 object-contain"
        />
        <div className="flex w-full flex-col">
          <CardHeader className="flex flex-1/2 flex-col align-middle">
            <CardTitle className="w-full">{action.name}</CardTitle>
            <CardDescription className="w-ful">
              {action.description}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="m-1" variant="outline">
              <img src="./icons/picture.png" />
            </Button>
            <img className="w-10" src={`./icons/level-${action.level}.png`} />

            <div className="ml-3 flex justify-center">
              <p className="text-2xl">{action.time}h </p>
              <img className="w-10" src={`./icons/hourglass.png`} />
            </div>
          </CardFooter>
        </div>
        <Button className="m-auto mr-2" variant="outline">
          +
        </Button>
      </div>
    </Card>
  );
}

export default ActionCard;
