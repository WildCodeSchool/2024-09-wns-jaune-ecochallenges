import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components';
import { Toaster } from '@/components/ui';
import { ThemeProvider } from './components/theme-provider';

export const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <main className="relative mx-auto h-[calc(100vh-var(--spacing-navbar))] overflow-y-auto p-2 md:p-4 lg:p-8">
        <Outlet />
      </main>
      <Toaster position="top-right" />
      <Navbar />
    </ThemeProvider>
  );
};
