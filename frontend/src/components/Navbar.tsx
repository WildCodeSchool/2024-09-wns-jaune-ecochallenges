import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui';
import { TrophyIcon, Leaf, HomeIcon, UserRound, BarChart3 } from 'lucide-react';

const navItems = [
  { to: '/challenges', icon: TrophyIcon, label: 'Challenges' },
  { to: '/actions', icon: Leaf, label: 'Actions' },
  { to: '/', icon: HomeIcon, label: 'Home' },
  { to: '/stats', icon: BarChart3, label: 'Stats' },
  { to: '/user', icon: UserRound, label: 'User' },
] as const;

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="h-navbar bg-primary fixed bottom-0 z-50 flex w-full items-center justify-between p-4 text-white md:justify-around">
      {navItems.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;

        return (
          <Button
            asChild
            variant="link"
            size="icon"
            key={to}
            aria-label={label}
            className={`rounded-md p-3 transition-colors ${isActive ? 'bg-secondary text-black' : 'text-white'}`}
          >
            <Link to={to} className="flex flex-col items-center justify-center">
              <Icon className="size-5" />
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};
