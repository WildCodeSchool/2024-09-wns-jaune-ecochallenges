import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="flex items-center justify-between">
        <nav className="space-x-4">
          <button>
            <Link to="/home" className="text-white hover:text-gray-400">
              Home
            </Link>
          </button>
          <button>
            <Link to="/challenges" className="text-white hover:text-gray-400">
              Challenges
            </Link>
          </button>
          <button>
            <Link to="/actions" className="text-white hover:text-gray-400">
              Actions
            </Link>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
