import { createContext, useState } from 'react';
import {
  clearSession,
  readSession,
  saveSession,
} from '../../shared/helpers/authSession';
import { loginAdmin as loginAdminRequest } from '../api/adminLogin';
import { loginPatient as loginPatientRequest } from '../api/patientLogin';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const startSession = (data, extra = {}) => {
    saveSession({ ...data, ...extra });
    setSession(readSession());
  };

  const loginAdmin = async (email, password) => {
    const data = await loginAdminRequest(email, password);

    startSession(data, { email });
  };

  const loginPatient = async (email, dni) => {
    const data = await loginPatientRequest(email, dni);

    startSession(data, { email, dni });
  };

  const logout = () => {
    clearSession();
    setSession(readSession());
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(session.token),
        role: session.role,
        dni: session.dni,
        email: session.email,
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
