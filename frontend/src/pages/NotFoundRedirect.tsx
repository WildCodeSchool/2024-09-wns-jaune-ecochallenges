import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundRedirect = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) navigate('/');
  }, [countdown]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="border-border bg-card w-full max-w-md rounded-2xl border p-6 shadow-md">
        <div className="mb-4 flex items-center justify-center">
          <span className="text-4xl">🌿</span>
        </div>
        <p className="mb-2 text-xl font-semibold">URL non reconnue</p>
        <p className="text-sm">
          Redirection vers un monde plus vert dans{' '}
          <span className="font-bold">{countdown}</span> seconde
          {countdown > 1 ? 's' : ''}...
        </p>
      </div>
    </div>
  );
};
