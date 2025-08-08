import { useAppSelector } from '@/redux/hooks';
import { Link } from 'react-router-dom';
import ToggleTheme from './theme/ToggleTheme';
import { Button } from './ui/button';

export default function Navbar() {
  const user = useAppSelector((state) => state.user);

  return (
    <nav className='flex justify-between px-3 py-4'>
      <span className='text-2xl font-bold'>JournaLys</span>
      <div className='flex gap-5'>
        <ToggleTheme />
        {user ? (
          'LoggedIn'
        ) : (
          <Link to='/login'>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
