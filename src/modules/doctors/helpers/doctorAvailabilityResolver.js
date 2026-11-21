import { validateAvailabilityRows } from './doctorAvailability.js';

export const doctorAvailabilityResolver = (values) => {
  const message = validateAvailabilityRows(values.rows);

  if (message) {
    return {
      values: {},
      errors: { rows: { root: { type: 'validate', message } } },
    };
  }

  return { values, errors: {} };
};
