import { serverUrl } from '@/constants/config';
import { useAuth } from '@/features/auth/api/authStore';

import { api } from '@/lib/apiClient';
import useHouseStore from '../houseStore';

export const fetchHouse = async (houseId) => {
  const userNumber = useAuth.getState().auth.number;
  try {
    const response = await api.get(
      `${serverUrl.sub}/api/fetch/house2/${houseId}/+91${userNumber}`
    );

    if (response.status !== 200) {
      return {
        success: false,
        data: {},
      };
    }

    useHouseStore.getState().updateHouse(response.data);

    return {
      success: 'success',
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const fetchConnectedDevices = async (data) => {
  try {
    const response = await api.post(
      `${serverUrl.connection}/house/devices`,
      data
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      data: {},
    };
  }
};

export const fetchUserHouses = async (email) => {
  try {
    const response = await api.get(
      `${serverUrl.sub}/api/fetch/keys/${email}?user=${email}`
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      data: {},
    };
  }
};
