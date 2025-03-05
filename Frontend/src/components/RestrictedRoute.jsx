import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RestrictedRoute = ({ children }) => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <Navigate to="/home" replace /> : children;
};

export default RestrictedRoute;
