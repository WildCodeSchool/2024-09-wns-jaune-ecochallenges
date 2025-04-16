import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const NotFoundRedirect = () => {
  const [countdown, setCountdown] = useState(5);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      setShouldRedirect(true);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="bg-background border-secondary w-full max-w-md rounded-2xl border p-6 shadow-md">
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
