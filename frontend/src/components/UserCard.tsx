import { Card, Avatar, AvatarImage } from '@/components/ui';

interface IUserCard {
  id: number;
  bernardPoints: number;
  nbActions: number;
  nbChallenges: number;
  picture?: string;
  pictureName?: string;
}

type UserCardProps = {
  readonly item: IUserCard;
};

export const UserCard = ({ item }: UserCardProps) => {
  return (
    <article className="m-4 mx-auto max-w-xl">
      <Card data-testid={`user-card-${item?.id}`} className="flex flex-row p-2">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={item?.picture ?? 'https://github.com/shadcn.png'}
            alt={item?.picture ?? 'default avatar'}
            data-testid="card-image"
          ></AvatarImage>
        </Avatar>
        <div>
          <h3 className="text-xl font-bold">Tes stats:</h3>

          <div className="flex flex-wrap">
            {/* section bernard point */}
            <div className="m-3 flex">
              <div className="ml-2 text-3xl">🦀</div>
              <div className="ml-2 flex flex-col font-bold">
                {' '}
                <span
                  className="text-accent text-3xl"
                  data-testid="bernardPoints"
                >
                  {item?.bernardPoints ?? 0}
                </span>
                bernards
              </div>
            </div>

            {/* section actions */}
            <div className="m-3 flex">
              <div className="ml-2 text-3xl">🌿</div>
              <div className="ml-2 flex flex-col font-bold">
                {' '}
                <span className="text-chart-2 text-3xl" data-testid="nbActions">
                  {item?.nbActions ?? 0}
                </span>
                actions
              </div>
            </div>

            {/* section challenges */}
            <div className="m-3 flex">
              <div className="ml-2 text-3xl">🏆</div>
              <div className="ml-2 flex flex-col font-bold">
                {' '}
                <span
                  className="text-chart-4 text-3xl"
                  data-testid="nbChallenges"
                >
                  {item?.nbChallenges ?? 0}
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
