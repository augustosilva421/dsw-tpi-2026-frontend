import { useEffect, useState } from 'react';
import { getAvailableSlots } from '../../doctors/api/doctorsApi';
import { getErrorMessage } from '../../shared/helpers/apiError';

export const useAvailableSlots = (doctorId) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!doctorId) {
      return undefined;
    }

    let ignore = false;

    setLoading(true);
    setError('');

    getAvailableSlots(doctorId)
      .then((data) => {
        if (!ignore) {
          setSlots(data);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setSlots([]);
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
  }, [doctorId, reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);

  return {
    slots: doctorId ? slots : [],
    loading: doctorId ? loading : false,
    error: doctorId ? error : '',
    reload,
  };
};
