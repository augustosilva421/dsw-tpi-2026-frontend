import { useEffect, useState } from 'react';
import { getErrorMessage } from '../../shared/helpers/apiError';
import { getDoctorAvailabilities } from '../api/availabilitiesApi';

function useDoctorAvailability(doctorId) {
  const [state, setState] = useState({ days: [], loading: true, error: '' });

  useEffect(() => {
    let ignore = false;

    getDoctorAvailabilities(doctorId)
      .then((days) => {
        if (!ignore) setState({ days, loading: false, error: '' });
      })
      .catch((error) => {
        if (!ignore) {
          setState({ days: [], loading: false, error: getErrorMessage(error) });
        }
      });

    return () => {
      ignore = true;
    };
  }, [doctorId]);

  return state;
}

export default useDoctorAvailability;
