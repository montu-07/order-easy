import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAppSelector((state: any) => state.auth);
  const location = useLocation();

  // Only redirect to login if not authenticated and not already on login/signup pages
  if (!token && location.pathname !== '/login' && location.pathname !== '/signup') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;