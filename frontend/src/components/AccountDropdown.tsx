import React, { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui';
import { useUserStore } from '@/lib/zustand/userStore';
import { Laptop, LogOutIcon, Moon, Sun, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogOutMutation } from '@/lib/graphql/generated/graphql-types';
import { useTheme } from './theme-provider';
import { GET_USER_BY_ID } from '@/lib/graphql/operations';
import { useQuery } from '@apollo/client';

export const AccountDropdown = () => {
  const isAuth = useUserStore((state) => !!state.user);
  const { theme, setTheme } = useTheme();

  const { logout, user } = useUserStore();
  const [logOutMutation] = useLogOutMutation();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data } = useQuery(GET_USER_BY_ID);
  const currentUser = data?.getCurrentUser;

  const handleLogout = () => {
    setDropdownOpen(false);
    setIsDialogOpen(false);
    logOutMutation();
    logout();
    navigate('/user');
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const themeIcon = {
    light: <Sun className="h-4 w-4" aria-hidden="true" />,
    dark: <Moon className="h-4 w-4" aria-hidden="true" />,
    system: <Laptop className="h-4 w-4" aria-hidden="true" />,
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-full">
          {isAuth && currentUser ? (
            <Avatar className="h-10 w-10 cursor-pointer transition-all duration-100 hover:scale-115">
              <AvatarImage
                src={currentUser.avatarUrl}
                alt="Photo de profil"
                data-testid="card-image"
              />
              <AvatarFallback delayMs={600}>
                {user?.firstname?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <UserRound
              className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground size-12 cursor-pointer rounded-lg p-3 transition-colors sm:rounded-full"
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
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <DialogTrigger className="flex gap-2">
                  <LogOutIcon className="size-4" aria-hidden="true" /> Se
                  déconnecter
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Êtes-vous sûr de vouloir vous déconnecter ?
                    </DialogTitle>
                    <DialogFooter className="mt-4">
                      <Button
                        onClick={() => {
                          setDropdownOpen(false);
                          setIsDialogOpen(false);
                        }}
                        onKeyDown={(e) =>
                          handleKeyDown(e, () => {
                            setDropdownOpen(false);
                            setIsDialogOpen(false);
                          })
                        }
                        type="button"
                        variant="outline"
                        aria-label="Annuler"
                      >
                        Annuler
                      </Button>
                      <Button
                        onClick={handleLogout}
                        onKeyDown={(e) => handleKeyDown(e, handleLogout)}
                        type="button"
                        variant="destructive"
                        aria-label="Se déconnecter"
                      >
                        Se déconnecter
                      </Button>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </DropdownMenuItem>
            </>
          ) : (
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
          )}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex items-center gap-2">
            Thème actuel: {themeIcon[theme]}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {['light', 'dark', 'system'].map((mode) => (
            <DropdownMenuItem
              key={mode}
              onClick={(e) => {
                setTheme(mode as 'light' | 'dark' | 'system');
                e.preventDefault();
              }}
              onKeyDown={(e) =>
                handleKeyDown(e, () =>
                  setTheme(mode as 'light' | 'dark' | 'system')
                )
              }
              role="menuitem"
              aria-label={`Changer pour le thème ${mode}`}
            >
              {themeIcon[mode]} Thème {mode}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};
