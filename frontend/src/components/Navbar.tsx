import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui';
import { TrophyIcon, Leaf, HomeIcon, UserRound, BarChart3 } from 'lucide-react';

const navItems = [
  { to: '/challenges', icon: TrophyIcon, label: 'Challenges' },
  { to: '/actions', icon: Leaf, label: 'Actions' },
  { to: '/', icon: HomeIcon, label: 'Home' },
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
          <Button
            asChild
            variant="ghost"
            key={to}
            aria-label={label}
            className={`rounded-full p-3 transition-colors ${
              isActive ? 'bg-white/10 text-blue-400' : 'text-white'
            }`}
          >
            <Link to={to}>
              <Icon />
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};
