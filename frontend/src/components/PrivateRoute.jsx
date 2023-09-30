import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner';

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
  }

  return loggedIn ? <Outlet /> : <Navigate to='/login/' />
  // If logged in then return "Outlet" (which will be the route, so it just lets us go were aver our privet route is) else, then we want to redirect, so here we using "Navigate" to login page
};
export default PrivateRoute;


/* Note:
"rafce" is shortcut for creating an arrow function component. 
*/