import { useState } from 'react';
import { FormCard } from '@/components/forms';
import { Login } from '@/components/forms/auth/Login';
import { Signup } from '@/components/forms/auth/Signup';
import { Logout } from '@/components/forms/auth/Logout';
import { useUserStore } from '@/lib/zustand/userStore';

export const User = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const user = useUserStore((state) => state.user);
  const isAuthenticated = !!user;

  return (
    <>
      <h1 className="mb-4 rounded-full text-center text-2xl font-thin">
        🌱 Welcome User 🌱
      </h1>

      {!isAuthenticated ? (
        <FormCard
          variant={isLoginMode ? 'login' : 'signup'}
          onToggleForm={setIsLoginMode}
        >
          {isLoginMode ? <Login /> : <Signup onToggleForm={setIsLoginMode} />}
        </FormCard>
      ) : (
        <Logout />
      )}
    </>
  );
};
