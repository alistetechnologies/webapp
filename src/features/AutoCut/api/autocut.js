import { serverUrl } from "@/constants/config";
import { fetchHouse } from "@/features/dashboard/api/house";
import useHouseStore from "@/features/dashboard/houseStore";
import { api } from "@/lib/apiClient";

// export const turnOnOffAutoEnabled = async (data) => {
//   axios
//     .post(`${autoCutUrl}/device/enableAutoOff`, data)
//     .then(async (res) => {
//       let list = store.getState().rooms.list;

//       await updateRoomlist([res.data], list);
//       if (res.data.success) {
//         if (data.enabled) {
//           showToast("Timer Activated");
//         } else {
//           showToast("Timer Deactivated");
//         }
//       }
//     })
//     .catch(function (err) {});
// };

export const toggleAutoCut = async (data) => {
  try {
    const response = await api.post(
      `${serverUrl.deviceHandler}/device/enableAutoOff`,
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

export const setAutoCut = async (data) => {
  try {
    console.log("[payload]", data);
    const response = await api.post(
      `${serverUrl.deviceHandler}/devices/setAutoTurnOff`,
      data
    );

    console.log("[response]", response.data);
    const house = useHouseStore.getState().house;
    if (response.data.success) {
      fetchHouse(house._id);
    }
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
