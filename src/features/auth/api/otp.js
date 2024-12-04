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

export const loginUserWithPasswordApi = async (data) => {
  try {
    console.log('[here]');
    const { phoneNumber, password, device } = data;
    // Make request
    const response = await api.post(
      `${serverUrl.auth}/token/generateAuthorizeToken`,
      {
        phoneNumber: phoneNumber,
        password,
        client: 'automation', //"automation"
        type: 'password', //"otp"
        device: device,
      }
    );

    return response.data;
  } catch (error) {
    let res = {
      success: false,
    };
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      res.message = error.response.data?.message;
    } else if (error.request) {
      // The request was made but no response was received
      res.message = 'Something Went Wrong';
    } else {
      // Something happened in setting up the request that triggered an Error

      res.message = 'Something Went Wrong';
    }

    return res;
  }
};
