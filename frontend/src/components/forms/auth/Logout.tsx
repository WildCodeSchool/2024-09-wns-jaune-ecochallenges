import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/zustand/userStore';

export const Logout = () => {
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    // Tu peux ajouter ici une redirection vers la page d'accueil après la déconnexion
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold">
        Êtes-vous sûr de vouloir vous déconnecter ?
      </h2>
      <Button onClick={handleLogout}>Se déconnecter</Button>
    </div>
  );
};
