import { createContext, useState } from 'react';
import { loginAdmin as loginAdminRequest } from '../api/adminLogin';
import { loginPatient as loginPatientRequest } from '../api/patientLogin';

const AuthContext = createContext();

const readSession = () => ({
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
  dni: localStorage.getItem('dni'),
});

function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const saveSession = ({ token, role }, dni = null) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    if (dni) {
      localStorage.setItem('dni', String(dni));
    } else {
      localStorage.removeItem('dni');
    }

    setSession({ token, role, dni: dni ? String(dni) : null });
  };

  const loginAdmin = async (email, password) => {
    const data = await loginAdminRequest(email, password);

    saveSession(data);
  };

  const loginPatient = async (email, dni) => {
    const data = await loginPatientRequest(email, dni);

    saveSession(data, dni);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('dni');
    setSession({ token: null, role: null, dni: null });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(session.token),
        role: session.role,
        dni: session.dni,
        loginAdmin,
        loginPatient,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };