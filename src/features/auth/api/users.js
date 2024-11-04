import { api } from '@/lib/apiClient';
import { useAuth } from './authStore';
import { serverUrl } from '@/constants/config';

export const fetchUser = async () => {
  const number = useAuth.getState().auth.number;
  try {
    const response = await api.get(
      `${serverUrl.sub}/api/fetch/user/+91${number}?user=+91${number}`
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
