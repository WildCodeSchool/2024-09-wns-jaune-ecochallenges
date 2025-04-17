type TabProps = {
  active: 'gestes' | 'fil' | 'check';
  setActive: (tab: 'gestes' | 'fil' | 'check') => void;
};

export const ChallengeDetailTabs = ({ active, setActive }: TabProps) => {
  const tabs = [
    { id: 'gestes', label: 'Mes gestes' },
    { id: 'fil', label: 'Fil' },
    { id: 'check', label: 'To check' },
  ];

  return (
    <div className="flex gap-2">
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
