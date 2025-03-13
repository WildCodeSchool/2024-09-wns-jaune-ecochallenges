import { Outlet } from 'react-router-dom';
import { Button } from './components/ui/button';

function App() {
  return (
    <>
      <h1 className="rounded-full text-3xl font-bold text-red-500 underline">
        Hello world with tailwind css!
      </h1>
      <Button>Click me with shadcn/ui</Button>
      <Outlet />
    </>
  );
}

export default App;
