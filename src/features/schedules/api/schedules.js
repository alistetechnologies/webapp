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
export const toggleAutoTimers = async () => {
  try {
    const response = await api.post(
      `${serverUrl.deviceHandler}/device/enableTimer`,
      data
    );

    const house = useHouseStore.getState().house;
    if (response.data.success) {
      fetchHouse(house._id);
    }
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

    const house = useHouseStore.getState().house;
    if (resp.data.success) {
      fetchHouse(house._id);
    }
    return resp.data;
  } catch (error) {
    return error?.response?.data;
  }
};
