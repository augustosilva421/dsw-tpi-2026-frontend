import usePaginatedQuery from '../../shared/hooks/usePaginatedQuery';
import { getSpecialties } from '../api/specialtiesApi';

function useSpecialties(params) {
  return usePaginatedQuery(getSpecialties, params);
}

export default useSpecialties;