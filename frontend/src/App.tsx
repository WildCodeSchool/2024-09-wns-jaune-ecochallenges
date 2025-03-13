import { Link, Outlet } from 'react-router-dom';
import { Button } from './components/ui/button';

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-teal-100">
        <h1 className="mb-8 rounded-full text-center text-3xl font-bold text-red-500 underline">
          Hello world with tailwind css!
        </h1>
        <Button className="mb-4 min-w-40">
          <Link to="/actions">to actions</Link>
        </Button>
        <Button className="mb-4 min-w-40">
          <Link to="/">to home</Link>
        </Button>
        <Outlet />
      </div>
    </>
  );
}

export default App;
