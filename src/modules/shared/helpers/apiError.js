const MESSAGES_BY_STATUS = {
  400: 'Los datos enviados no son válidos.',
  403: 'No tenés permisos para realizar esta acción.',
  404: 'No se encontró el recurso solicitado.',
  409: 'La operación entra en conflicto con el estado actual de los datos.',
};

const FIXED_MESSAGES_BY_STATUS = {
  401: 'Los datos ingresados son incorrectos.',
  429: 'Demasiados intentos. Esperá un minuto y volvé a intentar.',
};

const getDetails = (data) => {
  if (Array.isArray(data?.details)) {
    return data.details.map(({ field, issue }) =>
      field ? `${field}: ${issue}` : issue
    );
  }

  if (data?.errors && typeof data.errors === 'object') {
    return Object.values(data.errors).flat();
  }

  return [];
};

export const getErrorMessage = (error) => {
  if (!error?.response) {
    return 'No se pudo conectar con el servidor. Intentá de nuevo más tarde.';
  }

  const { status, data } = error.response;

  if (FIXED_MESSAGES_BY_STATUS[status]) {
    return FIXED_MESSAGES_BY_STATUS[status];
  }

  const base =
    data?.message ||
    data?.title ||
    MESSAGES_BY_STATUS[status] ||
    'Ocurrió un error inesperado.';
  const details = getDetails(data);

  return details.length ? `${base} (${details.join(' · ')})` : base;
};
