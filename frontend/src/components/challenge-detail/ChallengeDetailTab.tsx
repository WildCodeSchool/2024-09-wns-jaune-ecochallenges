type TabProps = {
  active: 'all' | 'done' | 'pending';
  setActive: (tab: 'all' | 'done' | 'pending') => void;
};

export const ChallengeDetailTab = ({ active, setActive }: TabProps) => {
    console.log('active', active)
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'done', label: 'Done' },
    { id: 'pending', label: 'Pending' },
  ];

  return (
    <div className="flex justify-around">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActive(tab.id as TabProps['active'])}
          className={`rounded-full border px-4 py-1 ${
            active === tab.id
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
