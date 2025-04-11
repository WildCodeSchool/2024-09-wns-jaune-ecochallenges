import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormCard } from '@/components/forms';
import { Login } from '@/components/forms/auth/Login';
import { Signup } from '@/components/forms/auth/Signup';
import { Logout } from '@/components/forms/auth/Logout';
import { useUserStore } from '@/lib/zustand/userStore';

export const User = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const toggleForm = () => setIsLoginMode((prev) => !prev);

  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isAuthenticated = !!user;

  useEffect(() => {
    if (isAuthenticated && window.location.pathname !== '/user') {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <h1 className="mb-4 rounded-full text-center text-2xl font-thin">
        🌱 Welcome User 🌱
      </h1>

      {!isAuthenticated && (
        <FormCard
          variant={isLoginMode ? 'login' : 'signup'}
          onToggleForm={toggleForm}
        >
          {isLoginMode ? <Login /> : <Signup onToggleForm={toggleForm} />}
          {/* {isLoginMode ? <Login /> : <Signup />} */}
        </FormCard>
      )}

      {isAuthenticated && <Logout />}
    </>
  );
};
