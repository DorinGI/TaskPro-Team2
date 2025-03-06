import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selector.js';

const useAuth = () => {
  return useSelector(selectIsLoggedIn);
};

export default useAuth;
