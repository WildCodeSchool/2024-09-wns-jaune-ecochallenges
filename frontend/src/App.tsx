import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export const App = () => {
  return (
    <>
      <main className="mx-auto p-2 md:p-4 lg:p-8">
        <Outlet />
      </main>
      <Navbar />
    </>
  );
};

export default App;
