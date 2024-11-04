import { serverUrl } from '@/constants/config';
import { api } from '@/lib/apiClient';

export const createOtp = async (data) => {
  try {
    console.log('data - ', data);
    const response = await api.post(`${serverUrl.user}/users/v1/otp`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    const message =
      error instanceof Error && error?.response?.data?.message
        ? error.response.data.message
        : 'An unexpected error occurred';
    return {
      success: false,
      message: message,
    };
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await api.post(
      `${serverUrl.auth}/token/generateAuthorizeToken`,
      data
    );

    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const createAccessToken = async (data) => {
  try {
    const response = await api.get(
      `${serverUrl.auth}/token/generateAccessToken`,
      {
        headers: {
          token: data.token,
          tokentype: 'authorizeToken',
          client: 'automation',
        },
      }
    );

    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
