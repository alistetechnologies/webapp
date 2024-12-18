import { serverUrl } from '@/constants/config';
import { fetchHouse } from '@/features/dashboard/api/house';
import useHouseStore from '@/features/dashboard/houseStore';
import { api } from '@/lib/apiClient';

export const fetchAllSchedulesForHouse = async () => {
  try {
    const house = useHouseStore.getState().house;

    const response = await api.post(
      `${serverUrl.web}/v3/centralschedules/listByHouse`,
      {
        houseId: house._id,
      }
    );

    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const createSchedule = async (data) => {
  try {
    const response = await api.post(
      `${serverUrl.web}/v3/centralschedules/create`,
      data
    );

    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const removeSchedule = async (data) => {
  try {
    const response = await api.post(
      `${serverUrl.web}/v3/centralschedules/remove`,
      data
    );

    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const toggleSchedule = async (data) => {
  try {
    const response = await api.post(
      `${serverUrl.web}/v3/centralschedules/update`,
      data
    );

    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
