const frontendErrorMessage = {
  1000: 'Usuario y/o Contraseña no son correctos',
  1002: 'Usuario y/o Contraseña no son correctos',
};

const getApiErrorMessage = (error) => {
  if (!error?.response) {
    return 'No se pudo conectar con el servidor. Intentá de nuevo más tarde.';
  }

  const { status, data } = error.response;

  if (status === 401) {
    return 'Los datos ingresados son incorrectos.';
  }

  if (status === 429) {
    return 'Demasiados intentos. Esperá un minuto y volvé a intentar.';
  }

  return data?.message || 'Ocurrió un error inesperado.';
};

export { frontendErrorMessage, getApiErrorMessage };