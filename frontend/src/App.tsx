import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components';
import { Toaster } from '@/components/ui';

export const App = () => {
  return (
    <>
      <main className="relative mx-auto h-[calc(100vh-var(--spacing-navbar))] overflow-y-auto p-2 md:px-4 lg:px-8">
        <Outlet />
      </main>
      <Toaster position="top-right" />
      <Navbar />
    </>
  );
};
