import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrophyIcon, Leaf, HomeIcon, UserRound, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <nav className="h-navbar bg-sidebar text-sidebar-foreground fixed bottom-0 z-50 flex w-full items-center justify-around rounded-t-2xl px-2 md:justify-around">
      {navItems.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;

        return (
          <Button
            asChild
            variant="link"
            size="icon"
            key={to}
            aria-label={label}
            className={cn(
              'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground bg-sidebar-primary text-sidebar-primary-foreground rounded-md p-6 transition-colors',
              isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
            )}
          >
            <Link to={to}>
              <Icon className="size-5" />
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};
