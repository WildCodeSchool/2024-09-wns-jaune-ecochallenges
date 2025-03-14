import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-teal-100">
        <h1 className="mb-8 rounded-full text-center text-3xl font-bold text-sky-400">
          Welcome on our Eco-challenge
        </h1>
        <Outlet />
      </div>
      <Navbar />
    </>
  );
}

export default App;
