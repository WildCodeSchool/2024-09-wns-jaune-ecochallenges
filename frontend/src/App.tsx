import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <h1 className="rounded-full text-3xl font-bold text-red-500 underline">
        Hello world with tailwind css!
      </h1>
      <Outlet />
    </>
  );
}

export default App;
