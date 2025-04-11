import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormCard } from '@/components/forms';
import { Login } from '@/components/forms/auth/Login';
import { Signup } from '@/components/forms/auth/Signup';
import { Logout } from '@/components/forms/auth/Logout';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/zustand/userStore';

export const User = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const toggleForm = () => setIsLoginMode((prev) => !prev);

  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isAuthenticated = !!user;

  useEffect(() => {
    if (isAuthenticated && window.location.pathname !== '/user') {
      navigate('/'); // redirection vers la home si l'utilisateur est authentifié et n'est pas déjà sur la page /user
    }
  }, [isAuthenticated, navigate]);

  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);

  const handleFakeLogin = () => {
    login({ email: 'test@user.com', password: 'Hello123+' });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <h1 className="mb-8 rounded-full text-center text-3xl font-thin">
        🌱 Welcome User 🌱
        <div className="mt-6 flex justify-center">
          {!isAuthenticated ? (
            <Button onClick={handleFakeLogin} variant="secondary">
              Fake connexion
            </Button>
          ) : (
            <Button onClick={handleLogout} variant="secondary">
              Se déconnecter
            </Button>
          )}
        </div>
      </h1>

      {!isAuthenticated && (
        <FormCard
          variant={isLoginMode ? 'login' : 'signup'}
          onToggleForm={toggleForm}
        >
          {isLoginMode ? <Login /> : <Signup />}
        </FormCard>
      )}

      {isAuthenticated && <Logout />}
    </>
  );
};
