import api from './api';

export async function updateActivity(token, activityId) {
  await api.patch(
    `/activity/${activityId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
