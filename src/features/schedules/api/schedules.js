import { serverUrl } from '@/constants/config';

import { api } from '@/lib/apiClient';
import useScheduleStore from '../scheduleStore';
import useHouseStore from '@/features/dashboard/houseStore';

export const fetchAllSchedulesForHouse = async (houseId) => {
  try {
    const response = await api.post(
      `${serverUrl.web}/v3/centralschedules/listByHouse`,
      {
        houseId: houseId,
      }
    );

    if (response.status !== 200) {
      return {
        success: false,
        data: {},
      };
    }

    useScheduleStore.getState().updateSchedules(response.data.data.schedules);

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

    if (response.data.success) {
      const house = useHouseStore.getState().house;

      fetchAllSchedulesForHouse(house._id);
    }
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

    if (response.data.success) {
      const house = useHouseStore.getState().house;

      fetchAllSchedulesForHouse(house._id);
    }
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

    if (response.data.success) {
      const house = useHouseStore.getState().house;

      fetchAllSchedulesForHouse(house._id);
    }
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
