import usePaginatedQuery from '../../shared/hooks/usePaginatedQuery';
import { searchAppointments } from '../api/appointmentsApi';

function useAppointmentsSearch(params) {
  return usePaginatedQuery(searchAppointments, params);
}

export default useAppointmentsSearch;
