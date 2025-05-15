import { Laptop, Moon, Sun } from 'lucide-react';

import {
  TrophyIcon,
  Leaf,
  HomeIcon,
  BarChart3,
  UserRound,
  LogOutIcon,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui';

import { useUserStore } from '@/lib/zustand/userStore';
import { useTheme } from './theme-provider';
import { Link, useLocation } from 'react-router-dom';

export const DesktopNavbarComponent = () => {
  const navItems = [
    { to: '/', icon: HomeIcon, label: 'Accueil' },
    { to: '/challenges', icon: TrophyIcon, label: 'Challenges' },
    { to: '/actions', icon: Leaf, label: 'Actions' },
    { to: '/stats', icon: BarChart3, label: 'Statistiques' },
  ] as const;

  const location = useLocation();
  const isAuth = useUserStore((state) => !!state.user);
  const { theme, setTheme } = useTheme();

  const themeIcon = {
    light: <Sun className="h-4 w-4" aria-hidden="true" />,
    dark: <Moon className="h-4 w-4" aria-hidden="true" />,
    system: <Laptop className="h-4 w-4" aria-hidden="true" />,
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <nav
      className="h-navbar bg-sidebar hidden items-center justify-between gap-2 p-4 sm:flex"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="flex h-full items-center gap-2">
        <img
          data-testid="card-image"
          className="aspect-square w-14 rounded-full"
          src="./images/sample.jpg"
          alt="Logo Eco-challenges"
          role="img"
        />

        <h1 className="text-sidebar-foreground text-2xl">Eco-challenges</h1>
        <p className="ml-2 hidden xl:flex">deja 120 challenges réalisés</p>
      </div>

      <div
        className="flex h-full items-center md:gap-2 lg:gap-4 xl:gap-8"
        role="menubar"
        aria-label="Menu principal"
      >
        {navItems.map(({ to, label }) => {
          const isActive = location.pathname === to;

          return (
            <>
              <span
                className="bg-sidebar-primary h-1.5 min-w-1.5 rounded-full first:hidden"
                aria-hidden="true"
              ></span>
              <div className="flex h-full w-full items-center justify-center">
                <Link
                  to={to}
                  key={to}
                  role="menuitem"
                  className={`text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent items-center justify-center rounded-2xl px-2 py-1 md:text-lg ${isActive ? 'text-sidebar-primary underline' : ''}`}
                >
                  <span className="">{label}</span>
                </Link>
              </div>
            </>
          );
        })}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-full">
          {/* // ADD USER STORE WITH USER INFO */}
          {isAuth ? (
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Photo de profil"
                data-testid="card-image"
              />
              <AvatarFallback delayMs={600}>PA</AvatarFallback>
            </Avatar>
          ) : (
            <UserRound
              className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground size-12 cursor-pointer rounded-full p-3 transition-colors"
              aria-hidden="true"
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          role="menu"
          aria-label="Options du menu utilisateur"
        >
          {isAuth ? (
            <>
              <DropdownMenuLabel>Mon profil</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  to="/user"
                  className="w-full"
                  role="menuitem"
                  aria-label="Accéder à mon espace"
                >
                  <UserRound className="size-4" aria-hidden="true" /> Accéder à
                  mon espace
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/user" className="w-full">
                  <LogOutIcon className="size-4" aria-hidden="true" /> Se
                  déconnecter
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link
                  to="/user"
                  className="w-full"
                  role="menuitem"
                  aria-label="Inscription / Connexion"
                >
                  Inscription / Connexion
                </Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex items-center gap-2">
            Thème actuel: {themeIcon[theme]}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              setTheme('light');
              e.preventDefault();
            }}
            onKeyDown={(e) => handleKeyDown(e, () => setTheme('light'))}
            role="menuitem"
            aria-label="Changer pour le thème clair"
          >
            {themeIcon['light']} Thème clair
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              setTheme('dark');
              e.preventDefault();
            }}
            onKeyDown={(e) => handleKeyDown(e, () => setTheme('dark'))}
            role="menuitem"
            aria-label="Changer pour le thème sombre"
          >
            {themeIcon['dark']} Thème sombre
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={(e) => {
              setTheme('system');
              e.preventDefault();
            }}
            onKeyDown={(e) => handleKeyDown(e, () => setTheme('system'))}
            role="menuitem"
            aria-label="Changer pour la préférence système"
          >
            {themeIcon['system']} Préférence système
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
