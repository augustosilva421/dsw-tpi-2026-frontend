import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './modules/auth/context/AuthProvider';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
import { ROLES } from './modules/shared/constants/roles';
import { ROUTES } from './modules/shared/constants/routes';

// Auth Module
import AdminLoginPage from './modules/auth/pages/AdminLoginPage';

// Patients Module
import PatientLoginPage from './modules/patients/pages/PatientLoginPage';
import PatientLayout from './modules/patients/components/PatientLayout';
import PatientHome from './modules/patients/pages/PatientHome';
import AppointmentsPage from './modules/patients/pages/AppointmentsPage';

// Dashboard Module
import DashboardLayout from './modules/dashboard/components/DashboardLayout';
import OverviewPage from './modules/dashboard/pages/OverviewPage';

// Domain Modules (Screaming Architecture)
import DoctorsPage from './modules/doctors/pages/DoctorsPage';
import SpecialtiesPage from './modules/specialties/pages/SpecialtiesPage';
import AppointmentsSearchPage from './modules/appointments/pages/AppointmentsSearchPage';

const routes = [
  // Rutas públicas
  { path: ROUTES.PATIENT_LOGIN, element: <PatientLoginPage /> },
  { path: ROUTES.ADMIN_LOGIN, element: <AdminLoginPage /> },

  // Rutas privadas de pacientes
  {
    path: ROUTES.PATIENT_HOME,
    element: (
      <ProtectedRoute
        redirectTo={ROUTES.PATIENT_LOGIN}
        allowedRoles={[ROLES.PATIENT]}
      >
        <PatientLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <PatientHome /> },
      { path: ROUTES.PATIENT_APPOINTMENTS, element: <AppointmentsPage /> },
    ],
  },

  // Rutas privadas de administración
  {
    path: ROUTES.ADMIN_ROOT,
    element: (
      <ProtectedRoute
        redirectTo={ROUTES.ADMIN_LOGIN}
        allowedRoles={[ROLES.ADMIN]}
      >
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to={ROUTES.ADMIN_HOME} replace /> },
      { path: ROUTES.ADMIN_HOME, element: <OverviewPage /> },
      { path: ROUTES.ADMIN_APPOINTMENTS, element: <AppointmentsSearchPage /> },
      {
        path: `${ROUTES.ADMIN_ROOT}/appointments`,
        element: <Navigate to={ROUTES.ADMIN_APPOINTMENTS} replace />,
      },
      { path: ROUTES.ADMIN_SPECIALTIES, element: <SpecialtiesPage /> },
      { path: ROUTES.ADMIN_DOCTORS, element: <DoctorsPage /> },
    ],
  },

  { path: '*', element: <Navigate to={ROUTES.PATIENT_HOME} replace /> },
];

function App() {
  const router = createBrowserRouter(routes);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
