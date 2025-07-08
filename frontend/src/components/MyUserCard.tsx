import { Card, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';

type MyUserCardProps = {
  id: number;
  bernardPoints: number;
  nbActions: number;
  nbChallenges: number;
  picture?: string;
  pictureName?: string;
};

export const MyUserCard = ({
  id,
  bernardPoints = 0,
  nbActions = 0,
  nbChallenges = 0,
  picture,
  pictureName,
}: MyUserCardProps) => {
  return (
    <article className="m-4 mx-auto max-w-xl">
      <Card data-testid={`user-card-${id}`} className="flex flex-row p-2">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={picture}
            alt={pictureName}
            data-testid="card-image"
          ></AvatarImage>
          <AvatarFallback delayMs={600}>{picture}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-bold">Tes stats:</h3>

          <div className="flex flex-wrap">
            {/* section bernard point */}
            <div className="m-3 flex">
              <div className="ml-2 text-3xl">🦀</div>
              <div className="ml-2 flex flex-col font-bold">
                {' '}
                <span className="text-3xl" data-testid="bernardPoints">
                  {bernardPoints ?? 0}
                </span>
                bernards
              </div>
            </div>

            {/* section actions */}
            <div className="m-3 flex">
              <div className="ml-2 text-3xl">🌿</div>
              <div className="ml-2 flex flex-col font-bold">
                {' '}
                <span className="text-3xl" data-testid="nbActions">
                  {nbActions ?? 0}
                </span>
                actions
              </div>
            </div>

            {/* section challenges */}
            <div className="m-3 flex">
              <div className="ml-2 text-3xl">🏆</div>
              <div className="ml-2 flex flex-col font-bold">
                {' '}
                <span className="text-3xl" data-testid="nbChallenges">
                  {nbChallenges ?? 0}
                </span>
                challenges
              </div>
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
};
