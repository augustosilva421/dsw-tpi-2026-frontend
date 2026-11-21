import axios from 'axios';
import { ROLES } from '../constants/roles';
import { ROUTES } from '../constants/routes';

const LOGIN_PATHS = ['/auth/admin/login', '/auth/patient/login'];

const isLoginRequest = (url = '') =>
  LOGIN_PATHS.some((path) => url.includes(path));

const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('dni');
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const role = localStorage.getItem('role');
    const isAdmin = role === ROLES.ADMIN;

    if (status === 401 && !isLoginRequest(error.config?.url)) {
      clearSession();
      window.location.href = isAdmin ? ROUTES.ADMIN_LOGIN : ROUTES.PATIENT_LOGIN;
    }

    if (status === 403) {
      const home = isAdmin ? ROUTES.ADMIN_HOME : ROUTES.PATIENT_HOME;

      if (window.location.pathname !== home) {
        window.location.href = home;
      }
    }

    return Promise.reject(error);
  }
);

export { instance };