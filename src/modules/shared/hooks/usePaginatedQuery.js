import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '../helpers/apiError';

const INITIAL_STATE = { data: [], total: 0, loading: true, error: '' };

function usePaginatedQuery(fetcher, params) {
  const [state, setState] = useState(INITIAL_STATE);
  const [reloadKey, setReloadKey] = useState(0);
  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    let ignore = false;

    setState((previous) => ({ ...previous, loading: true, error: '' }));

    fetcher(JSON.parse(paramsKey))
      .then((result) => {
        if (ignore) return;
        setState({
          data: result.data ?? [],
          total: result.total ?? 0,
          loading: false,
          error: '',
        });
      })
      .catch((error) => {
        if (ignore) return;
        setState({
          data: [],
          total: 0,
          loading: false,
          error: getErrorMessage(error),
        });
      });

    return () => {
      ignore = true;
    };
  }, [fetcher, paramsKey, reloadKey]);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  return { ...state, reload };
}

export default usePaginatedQuery;