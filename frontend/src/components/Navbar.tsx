import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  return (
    <nav className="h-navbar fixed bottom-0 z-50 flex w-full items-center justify-around bg-gray-800 p-4 text-white">
      <Button variant="ghost">
        <Link to="/home" className="text-white hover:text-gray-400">
          Home
        </Link>
      </Button>
      <Button variant="ghost">
        <Link to="/challenges" className="text-white hover:text-gray-400">
          Challenges
        </Link>
      </Button>
      <Button variant="ghost">
        <Link to="/actions" className="text-white hover:text-gray-400">
          Actions
        </Link>
      </Button>
    </nav>
  );
};
