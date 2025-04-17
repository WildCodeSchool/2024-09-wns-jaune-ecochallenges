import { Pill } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const ChallengeDetailHeader = () => {
  const backgroundImage = 'https://picsum.photos/800/200';
  const userAvatar = '/public/images/ElieB.png';

  const dates = {
    startDate: new Date().toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
    }),
    endDate: new Date().toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
    }),
    timeLeft: Math.floor(
      (new Date().getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24
    ),
  };

  const infos = ['Rank', '60%'];

  // 💡 Fake data locale temporaire
  const challenge = {
    label: 'Challenge Name',
    description: 'Un super défi pour adopter des gestes éco-responsables !',
    startDate: dates.startDate,
    endDate: dates.endDate,
    timeLeft: dates.timeLeft,
    image: 'https://picsum.photos/800/200',
  };

  const tags = [
    '🥦 food',
    '🚗 transport',
    '💡 energy',
    '🗑️ waste',
    '💧 water',
    '💻 tech',
  ]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 1);

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
      {/* Background image */}
      <div
        className="relative flex h-48 w-full flex-col justify-between bg-cover bg-center p-4"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 z-0 bg-black/40" />

        {/* Title */}
        <div className="relative z-10 text-xl font-bold text-white">
          {challenge ? challenge.label : '🌱 Challenge Title'};
        </div>

        {/* User avatar */}
        <div className="absolute top-4 right-4 z-10">
          <Avatar>
            <AvatarImage src={userAvatar} alt="Elie B" />
            <AvatarFallback>EB</AvatarFallback>
          </Avatar>
          {/* Rank & Progress */}
          <ul className="relative z-10 mt-2 flex flex-col gap-2">
            {infos.map((info) => (
              <li key={info}>
                <Pill className="bg-white/80 font-medium text-black">
                  {info}
                </Pill>
              </li>
            ))}
            {/* <Pill className="bg-white/80 font-medium text-black">Rank</Pill>
            <Pill className="bg-white/80 font-medium text-black">60%</Pill> */}
            {/* Rank & Progress */}
          </ul>
        </div>

        <div className="absolute bottom-2 left-4 z-10">
          {/* Tags section */}
          <div className="flex gap-2 p-0.5">
            {tags.map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </div>
          {/* Tags section */}
          <div className="flex flex-wrap gap-2">
            <Pill className="col-span-3 px-2">
              📅 {challenge.startDate} → {challenge.endDate}
            </Pill>
            <Pill className="col-span-2">
              {challenge.timeLeft > 0
                ? `⌛ ${challenge.timeLeft} d. left`
                : '❌ Ended'}
            </Pill>
          </div>
        </div>
      </div>
    </div>
  );
};
