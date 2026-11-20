import usePaginatedQuery from '../../shared/hooks/usePaginatedQuery';
import { getDoctors } from '../api/doctorsApi';

function useDoctors(params) {
  return usePaginatedQuery(getDoctors, params);
}

export default useDoctors;