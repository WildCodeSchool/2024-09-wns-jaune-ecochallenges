import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components';

export const App = () => {
  return (
    <>
      <main className="mx-auto h-[calc(100vh-var(--spacing-navbar))] overflow-y-auto bg-blue-50 p-2 md:p-4 lg:p-8">
        <Outlet />
      </main>
      <Navbar />
    </>
  );
};
