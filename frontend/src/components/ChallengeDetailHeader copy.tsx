import { Pill } from '@/components';

export const ChallengeDetailHeader = () => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md">
      <img
        src="https://picsum.photos/800/200"
        alt="Challenge banner"
        className="h-48 w-full object-cover"
      />

      <div className="absolute top-4 left-4 text-xl font-bold text-white">
        🌱 Eco Challenge
      </div>

      <div className="absolute top-4 right-4">
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="h-10 w-10 rounded-full border-2 border-white"
        />
      </div>

      <div className="absolute bottom-4 left-4 flex gap-2">
        <Pill>🏅 Rank #5</Pill>
        <Pill>📊 60%</Pill>
      </div>

      <div className="flex flex-wrap gap-2 bg-slate-100 p-2">
        <Pill>💡 energy</Pill>
        <Pill>🥦 food</Pill>
        <Pill>🚗 transport</Pill>
      </div>
    </div>
  );
};
