import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROLES } from '../constants/roles';

const HOME_BY_ROLE = {
  [ROLES.ADMIN]: '/admin/home',
  [ROLES.PATIENT]: '/',
};

function ProtectedRoute({ children, allowedRoles, redirectTo = '/login' }) {
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