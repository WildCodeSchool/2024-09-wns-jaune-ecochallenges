import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components';
import { Toaster } from '@/components/ui/sonner';

export const App = () => {
  return (
    <>
      <main className="relative mx-auto h-[calc(100vh-var(--spacing-navbar))] overflow-y-auto p-2 md:p-4 lg:p-8">
        <Outlet />
      </main>
      <Toaster offset={{ bottom: '70px', right: '80px' }} />
      <Navbar />
    </>
  );
};
