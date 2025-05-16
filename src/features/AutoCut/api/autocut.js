import { serverUrl } from "@/constants/config";
import { fetchHouse } from "@/features/dashboard/api/house";
import useHouseStore from "@/features/dashboard/houseStore";
import { api } from "@/lib/apiClient";

export const toggleAutoCut = async (data) => {
  try {
    const response = await api.post(
      `${serverUrl.deviceHandler}/device/enableAutoOff`,
      data
    );

    const house = useHouseStore.getState().house;
    if (response.data.success) {
      await fetchHouse(house._id);
    }
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const setAutoCut = async (data) => {
  try {
    const response = await api.post(
      `${serverUrl.deviceHandler}/devices/setAutoTurnOff`,
      data
    );

    const house = useHouseStore.getState().house;
    if (response.data.success) {
      await fetchHouse(house._id);
    }
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
