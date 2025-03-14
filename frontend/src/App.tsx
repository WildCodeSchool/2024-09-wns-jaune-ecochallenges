import { Outlet } from 'react-router-dom';

function App() {
  return (
    <main className="mx-auto p-2 md:p-4 lg:p-8">
      <Outlet />
    </main>
  );
}

export default App;
