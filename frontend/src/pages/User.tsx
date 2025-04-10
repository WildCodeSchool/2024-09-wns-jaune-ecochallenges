import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormCard } from '@/components/forms';
import { Login } from '@/components/forms/auth/Login';
import { Signup } from '@/components/forms/auth/Signup';
import { Button } from '@/components/ui/button';

// 🧪 Store zustand à décommenter quand il sera prêt
// import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/lib/zustand/userStore';
import { useSignUpMutation } from '@/lib/graphql/generated/graphql-types';

export const User = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 🧪 Simulation locale de l'état de connexion
  //const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ À activer quand le store est dispo
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  console.log('loged? : ', isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const isLogin = pathname === '/login';

  const handleFakeLogin = () => {
    setIsAuthenticated(); // 🧪 simule une connexion
    // useAuthStore.getState().login(); // 🔓 ou utiliser une méthode du store
  };

  return (
    <>
      <h1 className="mb-8 rounded-full text-center text-3xl font-thin">
        🌱 Welcome User 🌱
        {/* 🔘 Bouton de test pour simuler un login */}
        <div className="mt-6 flex justify-center">
          <Button onClick={handleFakeLogin} variant="secondary">
            Simuler une connexion
          </Button>
        </div>
      </h1>

      <FormCard>{isLogin ? <Login /> : <Signup />}</FormCard>
    </>
  );
};
