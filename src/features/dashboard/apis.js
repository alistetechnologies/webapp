
import apiClient from '@/lib/apiClient';
export const fetchDayAnalysis = async data => {
  try {
    const response = await apiClient.post(
      `https://keiozfbox5.execute-api.ap-south-1.amazonaws.com/default/analyse/day`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching daily analysis:', error);
    return {
      success: false,
      message:
        error?.response?.data?.message || 'Failed to fetch daily analysis',
      data: null,
    };
  }
};
