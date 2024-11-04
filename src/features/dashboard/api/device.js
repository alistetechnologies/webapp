import { serverUrl } from '@/constants/config';
import { api } from '@/lib/apiClient';

export const fetchDayAnalytics = async (data) => {
  try {
    const response = await api.post(
      `${serverUrl.analytics}/legacy/dayAnalytics`,
      data
    );

    if (!response.data?.success) {
      //TODO
    }

    return response?.data;
  } catch (error) {
    return {
      success: false,
      data: {},
    };
  }
};
