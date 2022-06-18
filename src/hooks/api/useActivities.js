import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivities() {
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivities,
  } = useAsync(() => activitiesApi.getAllActivities(token));

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivities,
  };
}
