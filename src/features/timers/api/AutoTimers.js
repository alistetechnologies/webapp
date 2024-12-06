import { serverUrl } from '@/constants/config';
import { api } from '@/lib/apiClient';

export const toggleAutoTimers = async (data) => {
  try {
    const response = await api.post(
      `${serverUrl.deviceHandler}/device/enableTimer`,
      data
    );

    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const setAutoTimers = async (payload) => {
  try {
    const resp = await api.post(
      `${serverUrl.deviceHandler}/devices/setTimer`,
      payload
    );

    return resp.data;
  } catch (error) {
    return error?.response?.data;
  }
};
