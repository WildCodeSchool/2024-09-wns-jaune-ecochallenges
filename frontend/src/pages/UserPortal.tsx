import { useState } from 'react';
import { FormCard } from '@/components/forms/auth';
import { Login } from '@/components/forms/auth/Login';
import { Signup } from '@/components/forms/auth/Signup';
import { Logout } from '@/components/forms/auth/Logout';
import { useUserStore } from '@/lib/zustand/userStore';

export const UserPortal = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const isAuth = useUserStore((state) => !!state.user);
  const user = useUserStore((state) => state.user);
  const toggleLoginMode = () => setIsLoginMode((prev) => !prev);
  return (
    <>
      <h1 className="mb-4 rounded-full text-center text-2xl font-thin">
        🌱 Bienvenue {user?.firstname} 🌱
      </h1>

      {!isAuth ? (
        <FormCard
          variant={isLoginMode ? 'login' : 'signup'}
          onToggleForm={toggleLoginMode}
        >
          {isLoginMode ? <Login /> : <Signup onToggleForm={setIsLoginMode} />}
        </FormCard>
      ) : (
        <Logout />
      )}
    </>
  );
};
