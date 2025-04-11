import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/zustand/userStore';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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
