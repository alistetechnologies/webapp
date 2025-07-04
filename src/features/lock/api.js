/** @format */
import { api } from "../../lib/apiClient";
import { serverUrl } from "@/constants/config";

export const adminPasswordApi = async (url, data, token) => {
  try {
    const response = await api({
      method: "POST",
      url: `${serverUrl.lockservice}/${url}`,
      data: data ? data : null,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.data?.success) {
      return response.data;
    }

    return response.data;
  } catch (err) {
    console.log("error in fetchAdminPassword", err.message);
    return "";
  }
};

export const syncLock = async (payload) => {
  try {
    const response = await api.post(
      `${serverUrl.sub}/v3/lock/update/time`,
      payload
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
