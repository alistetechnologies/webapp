import { serverUrl } from "@/constants/config";
import { api } from "@/lib/apiClient";
import apiClient from "@/lib/apiClient";

export const fetchDayAnalytics = async (data) => {
  try {
    const response = await api.post(`${serverUrl.deviceApi}/analyse/day`, data);

    if (!response.data?.success) {
      //TODO
    }

    return response?.data;
  } catch (error) {
    return {
      success: false,
      data: {},
    };
  }
};

export const controlDevice = async (data) => {
  try {
    const response = await api.post(`${serverUrl.a2}/v3/device/control`, {
      ...data,
      controllerDetails: {},
      controllerType: "Dashboard",
    });

    if (!response.data?.success) {
      //TODO
    }

    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message,
      data: error?.response?.data,
    };
  }
};

export const fetchDeviceDetails = async (data) => {
  try {
    const response = await api.post(`${serverUrl.deviceService}/details`, data);

    if (!response.data?.success) {
      //TODO
    }

    return response?.data;
  } catch (error) {
    return {
      success: false,
      data: {},
    };
  }
};

export const fetchDayAnalysis = async (data) => {
  try {
    const response = await apiClient.post(
      `${serverUrl.deviceApi}/analyse/day`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching daily analysis:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message || "Failed to fetch daily analysis",
      data: null,
    };
  }
};
