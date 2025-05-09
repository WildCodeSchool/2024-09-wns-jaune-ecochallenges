import { Button } from '@/components/ui';
import { useUserStore } from '@/lib/zustand/userStore';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/user');
    logout();
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
