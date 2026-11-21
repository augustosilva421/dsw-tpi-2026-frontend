import { useCallback, useEffect, useState } from 'react';
import { getPatientAppointments } from '../api/patientAppointmentsApi';
import { getErrorMessage } from '../../shared/helpers/apiError';

export const usePatientAppointments = (dni) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!dni) {
      setLoading(false);

      return undefined;
    }

    let ignore = false;

    setLoading(true);
    setError('');

    getPatientAppointments(dni)
      .then((data) => {
        if (!ignore) {
          setAppointments(data);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setAppointments([]);
          setError(getErrorMessage(err));
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [dni, reloadKey]);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  return { appointments, loading, error, reload };
};
