import { serverUrl } from "@/constants/config";

import axios from "axios";
import toast from "react-hot-toast";

export const fetchHouseUserDetails = async (houseId, userNumber) => {
  try {
    const response = await axios.post(
      `${
        serverUrl.sub
      }/v2/house/user_details?user=+91${userNumber}&timestamp=${new Date().getTime()}`,
      {
        houseId,
        userId: `+91${userNumber}`,
      }
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
};

export const checkUserExists = async (email, authUser) => {
  try {
    const response = await axios.get(
      `${
        serverUrl.sub
      }/v2/user/exists/+91${email}?user=${authUser}&time=${new Date().getTime()}`
    );

    const { data, success, message } = response.data;
    return { success, message, exists: data.exists };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const removeUserFromHouse = async (houseId, userNumber, newOwner) => {
  try {
    const response = await axios.put(
      `${
        serverUrl.sub
      }/v2/house/remove_user_from_house?user=${userNumber}&timestamp=${new Date().getTime()}`,
      {
        userId: userNumber,
        houseId,
        newOwner,
      }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

export const changeRoomAccess = async (
  houseId,
  userNumber,
  authUser,
  roomIds,
  role,
  validtill
) => {
  try {
    const response = await axios.post(
      `${
        serverUrl.sub
      }/v2/house/change_room_access?user=${authUser}&timestamp=${new Date().getTime()}`,
      {
        userId: `+91${userNumber}`,
        houseId,
        roomIds,
        role,
        validtill,
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
};

export const updateUserHouseAccess = async (userNumber, payload) => {
  try {
    const response = await axios.post(
      `${
        serverUrl.sub
      }/v2/house/add/userWithAccess?user=+91${userNumber}&timestamp=${new Date().getTime()}`,
      payload
    );

    return response.data;
  } catch (error) {
    console.log("error", error.response);
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

// export const fetchAllSchedulesForHouse = async (houseId) => {
//   try {
//     const response = await api.post(
//       `${serverUrl.web}/v3/centralschedules/listByHouse`,
//       {
//         houseId: houseId,
//       }
//     );

//     if (response.status !== 200) {
//       return {
//         success: false,
//         data: {},
//       };
//     }

//     useScheduleStore.getState().updateSchedules(response.data.data.schedules);

//     return response.data;
//   } catch (error) {
//     return error?.response?.data;
//   }
// };

// export const createSchedule = async (data) => {
//   try {
//     const response = await api.post(
//       `${serverUrl.web}/v3/centralschedules/create`,
//       data
//     );

//     if (response.data.success) {
//       const house = useHouseStore.getState().house;

//       fetchAllSchedulesForHouse(house._id);
//     }
//     return response.data;
//   } catch (error) {
//     return error?.response?.data;
//   }
// };

// export const removeSchedule = async (data) => {
//   try {
//     const response = await api.post(
//       `${serverUrl.web}/v3/centralschedules/remove`,
//       data
//     );

//     if (response.data.success) {
//       const house = useHouseStore.getState().house;

//       fetchAllSchedulesForHouse(house._id);
//     }
//     return response.data;
//   } catch (error) {
//     return error?.response?.data;
//   }
// };

// export const toggleSchedule = async (data) => {
//   try {
//     const response = await api.post(
//       `${serverUrl.web}/v3/centralschedules/update`,
//       data
//     );

//     if (response.data.success) {
//       const house = useHouseStore.getState().house;

//       fetchAllSchedulesForHouse(house._id);
//     }
//     return response.data;
//   } catch (error) {
//     return error?.response?.data;
//   }
// };

// export const updateSchedule = async (data) => {
//   try {
//     console.log("[data]", data);
//     const response = await api.post(
//       `${serverUrl.web}/v3/centralschedules/update`,
//       data
//     );

//     if (response.data.success) {
//       const house = useHouseStore.getState().house;

//       fetchAllSchedulesForHouse(house._id);
//     }
//     return response.data;
//   } catch (error) {
//     return error?.response?.data;
//   }
// };
