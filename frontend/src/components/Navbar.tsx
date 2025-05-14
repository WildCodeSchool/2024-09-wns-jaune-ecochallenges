import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui';
import {
  TrophyIcon,
  Leaf,
  HomeIcon,
  UserRound,
  BarChart3,
  Sun,
  Moon,
  Laptop,
  LogOutIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useUserStore } from '@/lib/zustand/userStore';
import { useTheme } from './theme-provider';

const navItems = [
  { to: '/challenges', icon: TrophyIcon, label: 'Challenges' },
  { to: '/actions', icon: Leaf, label: 'Actions' },
  { to: '/', icon: HomeIcon, label: 'Home' },
  { to: '/stats', icon: BarChart3, label: 'Stats' },
] as const;

export const Navbar = () => {
  const location = useLocation();
  const isAuth = useUserStore((state) => !!state.user);
  const { theme, setTheme } = useTheme();

  const themeIcon = {
    light: <Sun className="h-4 w-4" />,
    dark: <Moon className="h-4 w-4" />,
    system: <Laptop className="h-4 w-4" />,
  };

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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserRound className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground size-12 cursor-pointer rounded-md p-3 transition-colors" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Mon profil</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isAuth ? (
            <>
              <DropdownMenuItem>
                <Link to="/user" className="flex items-center gap-2">
                  Accéder à mon espace <UserRound className="size-4" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/user" className="flex justify-between gap-2">
                  Déconnexion <LogOutIcon className="size-4" />
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem>
                <Link to="/user">Inscription / Connexion</Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex items-center gap-2">
            Thème: {themeIcon[theme]}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setTheme('light')}>
            Thème clair {themeIcon['light']}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            Thème sombre {themeIcon['dark']}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setTheme('system')}>
            Préférence système {themeIcon['system']}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
