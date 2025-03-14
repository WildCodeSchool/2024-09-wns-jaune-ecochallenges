import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-teal-100">
      <h1 className="mb-8 rounded-full text-center text-3xl font-bold text-sky-400">
        Welcome on our Eco-challenge
      </h1>
      <ul>
        <li>
          <Button asChild className="mb-4 min-w-40">
            <Link to="/actions">to actions</Link>
          </Button>
        </li>
        <li>
          <Button asChild className="mb-4 min-w-40">
            <Link to="/">to home</Link>
          </Button>
        </li>
        <li>
          <Button asChild className="mb-4 min-w-40">
            <Link to="/challenges">to challenges</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
};
