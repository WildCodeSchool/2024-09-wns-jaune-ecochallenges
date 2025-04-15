import { Card, Avatar, AvatarImage } from '@/components/ui';

export const UserCard = () => {
  return (
    <article className="m-4 mx-auto max-w-xl border-1">
      <Card className="flex flex-row p-2">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          ></AvatarImage>
        </Avatar>
        <div className="">
          <h3 className="text-xl font-bold">Tes stats:</h3>

          <div className="flex flex-wrap">
            {/* section bernard point */}
            <div className="m-3 flex">
              <div className="ml-2 text-3xl">🦀</div>
              <div className="ml-2 flex flex-col font-bold">
                {' '}
                <span className="text-accent text-3xl">67</span>bernards
              </div>
            </div>

            {/* section actions */}
            <div className="m-3 flex">
              <div className="ml-2 text-3xl">🌿</div>
              <div className="ml-2 flex flex-col font-bold">
                {' '}
                <span className="text-3xl text-green-600">150</span>actions
              </div>
            </div>

            {/* section challenges */}
            <div className="m-3 flex">
              <div className="ml-2 text-3xl">🏆</div>
              <div className="ml-2 flex flex-col font-bold">
                {' '}
                <span className="text-3xl text-yellow-600">3</span>challenges
              </div>
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
};
