import { useState } from 'react';
import { FormCard } from '@/components/forms/auth';
import { Login } from '@/components/forms/auth/Login';
import { Signup } from '@/components/forms/auth/Signup';
import { useUserStore } from '@/lib/zustand/userStore';
import UserAccount from './UserAccount';

export const UserPortal = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const isAuth = useUserStore((state) => !!state.user);
  const toggleLoginMode = () => setIsLoginMode((prev) => !prev);
  return (
    <>
      {!isAuth ? (
        <FormCard
          variant={isLoginMode ? 'login' : 'signup'}
          onToggleForm={toggleLoginMode}
        >
          {isLoginMode ? <Login /> : <Signup onToggleForm={setIsLoginMode} />}
        </FormCard>
      ) : (
        <>
          <UserAccount />
        </>
      )}
    </>
  );
};
