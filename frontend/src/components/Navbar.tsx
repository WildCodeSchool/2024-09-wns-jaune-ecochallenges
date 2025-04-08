import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui';
import { TrophyIcon, Leaf, HomeIcon, UserRound, BarChart3 } from 'lucide-react';

const navItems = [
  { to: '/challenges', icon: TrophyIcon, label: 'Challenges' },
  { to: '/actions', icon: Leaf, label: 'Actions' },
  { to: '/home', icon: HomeIcon, label: 'Home' },
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
