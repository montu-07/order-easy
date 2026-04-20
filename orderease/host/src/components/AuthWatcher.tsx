import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const AuthWatcher = () => {
  const { token, user, success } = useAppSelector((state: any) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthPage =
      location.pathname === '/login' || location.pathname === '/signup';

    const isAuthenticated = !!token || !!user || success === 'Login successful';

    if (isAuthPage && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [token, user, success, location.pathname, navigate]);

  return null;
};

export default AuthWatcher;