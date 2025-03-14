import { Outlet } from 'react-router-dom';
import Navbar from './organisms/Navbar';

function App() {
  return (
    <>
      <h1 className="rounded-full text-3xl font-bold text-red-500 underline">
        Hello world with tailwind css!
      </h1>

      <Outlet />
      <Navbar />
    </>
  );
}

export default App;
