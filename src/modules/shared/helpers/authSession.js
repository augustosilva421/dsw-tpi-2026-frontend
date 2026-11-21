const STORAGE_KEYS = {
  TOKEN: 'token',
  ROLE: 'role',
  DNI: 'dni',
  EMAIL: 'email',
};

export const readSession = () => ({
  token: localStorage.getItem(STORAGE_KEYS.TOKEN),
  role: localStorage.getItem(STORAGE_KEYS.ROLE),
  dni: localStorage.getItem(STORAGE_KEYS.DNI),
  email: localStorage.getItem(STORAGE_KEYS.EMAIL),
});

export const saveSession = ({ token, role, dni = null, email = null }) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.ROLE, role);

  if (dni) {
    localStorage.setItem(STORAGE_KEYS.DNI, String(dni));
  } else {
    localStorage.removeItem(STORAGE_KEYS.DNI);
  }

  if (email) {
    localStorage.setItem(STORAGE_KEYS.EMAIL, email);
  } else {
    localStorage.removeItem(STORAGE_KEYS.EMAIL);
  }
};

export const clearSession = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};