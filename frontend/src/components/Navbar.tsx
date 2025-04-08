import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui';
import { Goal, HandCoins, House, UserRound, BarChart3 } from 'lucide-react';

const navItems = [
  { to: '/challenges', icon: Goal, label: 'Challenges' },
  { to: '/actions', icon: HandCoins, label: 'Actions' },
  { to: '/home', icon: House, label: 'Home' },
  { to: '/stats', icon: BarChart3, label: 'Stats' },
  { to: '/user', icon: UserRound, label: 'User' },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="h-navbar fixed bottom-0 z-50 flex w-full items-center justify-around bg-green-800 p-4 text-white">
      {navItems.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;

        return (
          <Button variant="ghost" key={to} aria-label={label}>
            <Link
              to={to}
              className={`flex flex-col items-center transition-colors ${
                isActive ? 'text-blue-500' : 'text-white'
              } hover:text-gray-400`}
            >
              <Icon />
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};
