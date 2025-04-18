import { Button } from '@/components/ui';
import { useLogOutMutation } from '@/lib/graphql/generated/graphql-types';
import { useUserStore } from '@/lib/zustand/userStore';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const { logout } = useUserStore();
  const [logOutMutation] = useLogOutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutMutation();
    logout();
    navigate('/user');
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
