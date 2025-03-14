import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Button } from './components/ui/button';

function App() {
  return (
    <>
      <div className="pb-16">
        <h1 className="rounded-full text-3xl font-bold text-red-500 underline">
          Hello world with tailwind css!
        </h1>
        <Button>Click me with shadcn/ui</Button>
        <Outlet />
      </div>
      <Navbar />
    </>
  );
}

export default App;
