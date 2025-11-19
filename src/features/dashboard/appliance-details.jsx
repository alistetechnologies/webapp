import { TableCell, TableRow } from "@/components/ui/table";
import { convertMilliseconds } from "@/utils/format";
import { Dot } from "lucide-react";
import { controlDevice, fetchDeviceDetails } from "./api/device";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { useUser } from "../auth/api/userStore";
import useHouseStore from "./houseStore";
import { format } from "crypto-js";
import { daysSince, timeSince } from "@/utils/date";
import LogsModal from "./LogsModal";
import { isOctiot } from "@/utils/browser";
import { octiotFont } from "@/constants/config";

export function ApplianceDetails({
  appliances,
  analysisData,
  sno,
  connectedDevices,
  logsDate,
}) {
  const user = useUser((state) => state.user);

  const updateState = useHouseStore((state) => state.updateState);
  const [logsOpen, setLogsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(
    "analysis data",
    analysisData.totalOnTime,
    analysisData.onlineTime,
    analysisData
  );
  const onTime = convertMilliseconds(analysisData?.totalOnTime);
  const onlineTime = convertMilliseconds(analysisData?.onlineTime);

  let appliance = appliances[analysisData?.deviceId].find(
    (appliance) => String(appliance.switchId) === String(analysisData?.switchId)
  );
  if (appliance?.deviceType === 7 || !appliance) return;
  const controlLogs = (analysisData?.controlLogs || []).filter((log) => {
    const timestamp = log.originalTimestamp || log.timestamp;
    const logDateTimestamp = new Date(logsDate).setHours(0, 0, 0, 0);
    if (
      log.controllerId === "disconnect" ||
      log.controllerId === "conn" ||
      log.controllerType === "disconnect"
    )
      return false;
    if (isNaN(timestamp) || isNaN(logDateTimestamp)) return false;
    return timestamp >= logDateTimestamp;
  });

  useEffect(() => {
    if (
      appliances[analysisData?.deviceId] === undefined ||
      appliances[analysisData?.deviceId] === null
    )
      return;
    appliance = appliances[analysisData?.deviceId].find(
      (appliance) =>
        String(appliance.switchId) === String(analysisData?.switchId)
    );
  }, [appliances]);
  const switchCommands = controlLogs.filter(
    (cmd) => cmd?.controllerType === "switch"
  ).length;
  const smartCommands = controlLogs.filter(
    (cmd) => cmd?.controllerType !== "switch"
  ).length;

  const toggleApplianceState = async (deviceConnected) => {
    if (!deviceConnected) {
      toast.error("Device is offline");
      return;
    }

    setLoading(true);
    const command = String(appliance.switchState) === "0" ? "100" : "0";
    const resp = await controlDevice({
      command,
      deviceId: appliance.deviceId,
      switchId: appliance.switchId,
      controllerId: user.email,
    });

    updateState(appliance.deviceId, appliance.switchId, command);
    setLoading(false);
  };

  const deviceConnected = connectedDevices.some(
    (d) => d.deviceId === analysisData?.deviceId
  );

  return (
    <TableRow className="">
      <TableCell
        style={{
          ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
        }}
      >
        {sno}
      </TableCell>
      <TableCell
        className="text-lg text-black hover:underline"
        style={{
          ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
        }}
        title={appliance.deviceId + "-" + appliance.switchId}
      >
        {appliance?.switchName}
      </TableCell>
      <TableCell
        className="text-lg text-center"
        style={{
          ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
        }}
      >
        {onTime?.hours
          ? `${String(onTime?.hours).padStart(2, "0")} hour${
              onTime?.hours > 1 ? "s" : ""
            }, ${String(onTime?.minutes).padStart(2, "0")} min`
          : onTime?.minutes
          ? `${String(onTime?.minutes).padStart(2, "0")} min`
          : "-"}
      </TableCell>
      <TableCell
        className="text-lg text-center"
        style={{
          ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
        }}
      >
        {onlineTime?.hours
          ? `${String(onlineTime?.hours).padStart(2, "0")} hr ${String(
              onlineTime?.minutes
            ).padStart(2, "0")} min`
          : onlineTime?.minutes
          ? `${String(onlineTime?.minutes).padStart(2, "0")} min`
          : "-"}
      </TableCell>
      <TableCell
        className="text-lg text-center"
        style={{
          ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
        }}
      >
        {controlLogs?.length || "-"}
      </TableCell>
      <TableCell
        className="text-lg text-center"
        style={{
          ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
        }}
      >
        {smartCommands || "-"}
      </TableCell>
      <TableCell
        className="font-bold text-center"
        style={{
          ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
        }}
      >
        {switchCommands || "-"}
      </TableCell>
      <TableCell
        className="cursor-pointer text-lg"
        style={{
          ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
        }}
      >
        {appliance?.switchState === "0" ? (
          <div
            className="p-1 bg-red-500/10 flex items-center justify-center rounded-md px-4 text-red-500 w-20"
            style={{
              ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
            }}
            onClick={() => {
              toggleApplianceState(deviceConnected);
            }}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Dot /> Off{" "}
              </>
            )}
          </div>
        ) : (
          <div
            className="p-1 bg-green-500/10 flex items-center justify-center rounded-md text-green-500 w-20"
            style={{
              ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
            }}
            onClick={() => {
              toggleApplianceState(deviceConnected);
            }}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Dot /> On
              </>
            )}
          </div>
        )}
      </TableCell>

      <TableCell className="cursor-pointer text-lg font-semibold">
        {deviceConnected ? (
          <div
            className=" flex items-center justify-center rounded-md px-4 text-green-500"
            style={{
              ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
            }}
          >
            Online
          </div>
        ) : (
          <div
            className="p-2 flex items-center justify-center rounded-md px-4 text-red-500"
            style={{
              ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
            }}
          >
            Offline
          </div>
        )}
      </TableCell>

      {/* Offline Since */}
      <TableCell>
        {deviceConnected ? (
          <div
            className="text-green-500"
            style={{
              ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
            }}
          >
            -
          </div>
        ) : (
          <div
            className="text-red-500"
            style={{
              ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
            }}
          >
            <OfflineSinceText deviceId={appliance.deviceId} />
          </div>
        )}
      </TableCell>

      {/* Actions */}
      <TableCell>
        <button
          className="px-4 py-2 bg-[#0F172A] text-white rounded-md hover:bg-[#1E293B] transition whitespace-nowrap"
          onClick={() => setLogsOpen(true)}
        >
          View Logs
        </button>
        <LogsModal
          open={logsOpen}
          onClose={() => setLogsOpen(false)}
          deviceId={analysisData?.deviceId}
          switchId={analysisData?.switchId}
          applianceName={appliance?.switchName}
        />
      </TableCell>
    </TableRow>
  );
}

const OfflineSinceText = ({ deviceId }) => {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOfflineSince = async () => {
      setLoading(true);
      const resp = await fetchDeviceDetails({ deviceId });
      setLoading(false);

      if (!resp.success || !resp?.data?.device?.disconnectedAt) {
        setDate("");
      } else {
        setDate(resp.data.device.disconnectedAt);
      }
    };
    getOfflineSince();
  }, [deviceId]);
  const formatted = (date) =>
    new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  if (loading) {
    return <Spinner />;
  }

  return (
    <span title={date ? formatted(date) : "No data to show!!"}>
      {date ? timeSince(date)?.string : "N/A"}
    </span>
  );
};
