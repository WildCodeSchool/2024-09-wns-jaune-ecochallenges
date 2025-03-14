import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export const App = () => {
  return (
    // <main className="mx-auto p-2 md:p-4 lg:p-8">
    //   <Outlet />
    // </main>

    <>
      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-teal-100"> */}
      <main className="mx-auto p-2 md:p-4 lg:p-8">
        <Outlet />
      </main>
      <Navbar />
    </>
  );
};

export default App;
