import { TrophyIcon, Leaf, HomeIcon, BarChart3 } from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';
import { AccountDropdown } from './AccountDropdown';

export const DesktopNavbarComponent = () => {
  const navItems = [
    { to: '/', icon: HomeIcon, label: 'Accueil' },
    { to: '/challenges', icon: TrophyIcon, label: 'Challenges' },
    { to: '/actions', icon: Leaf, label: 'Actions' },
    { to: '/stats', icon: BarChart3, label: 'Statistiques' },
  ] as const;

  const location = useLocation();

  return (
    <nav
      className="h-navbar bg-sidebar pointer-events-auto hidden items-center justify-between gap-2 p-4 sm:flex"
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
      <AccountDropdown />
    </nav>
  );
};
