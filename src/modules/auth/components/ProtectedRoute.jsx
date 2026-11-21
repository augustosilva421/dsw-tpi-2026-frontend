import { Navigate } from 'react-router-dom';
import { ROLES } from '../../shared/constants/roles';
import { ROUTES } from '../../shared/constants/routes';
import useAuth from '../hooks/useAuth';

const HOME_BY_ROLE = {
  [ROLES.ADMIN]: ROUTES.ADMIN_HOME,
  [ROLES.PATIENT]: ROUTES.PATIENT_HOME,
};

function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = ROUTES.PATIENT_LOGIN,
}) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={HOME_BY_ROLE[role] ?? redirectTo} replace />;
  }

  return children;
}

export default ProtectedRoute;