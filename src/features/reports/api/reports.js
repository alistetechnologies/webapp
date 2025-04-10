import { serverUrl } from "@/constants/config";
import { api } from "@/lib/apiClient";

export const fetchSyncAnalysisReport = async (data) => {
  try {
    const response = await api.post(
      `${serverUrl.sub}/v3/reports/syncDeviceAnalysisForHouses`,
      data
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const fetchLockRecordData = async (data) => {
  try {
		const response = await api.post(`${serverUrl.sub}/v3/reports/lockRecord`, data);

		return response.data;
	} catch (error) {
		return {
			success: false,
			message: error?.response?.data?.message || error.message,
		};
	}
}