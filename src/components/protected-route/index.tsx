import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { userSelectors } from '../../services/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { getIsAuthChecked, getUser } = userSelectors;
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to='/login'
        state={{
          from: {
            ...location,
            backgroundLocation: location.state?.backgroundLocation
          }
        }}
      />
    );
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.backgroundLocation || null;
    return <Navigate replace to={from} state={{ backgroundLocation }} />;
  }

  return children;
};
