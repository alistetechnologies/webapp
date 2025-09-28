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

export function ApplianceDetails({
  appliances,
  analysisData,
  sno,
  connectedDevices,
}) {
  const user = useUser((state) => state.user);
  const house = useHouseStore((state) => state.house);
  const updateState = useHouseStore((state) => state.updateState);
  const [logsOpen, setLogsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onTime = convertMilliseconds(analysisData?.totalOnTime);
  const onlineTime = convertMilliseconds(analysisData?.onlineTime);

  let appliance = appliances[analysisData?.deviceId].find(
    (appliance) => String(appliance.switchId) === String(analysisData?.switchId)
  );
  if (appliance?.deviceType === 7 || !appliance) return;
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
  const switchCommands = analysisData?.controlLogs.filter(
    (cmd) => cmd?.controllerType === "switch"
  ).length;
  const smartCommands = analysisData?.controlLogs.filter(
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
      <TableCell>{sno}</TableCell>
      <TableCell
        className="text-lg text-black hover:underline"
        title={appliance.deviceId + "-" + appliance.switchId}
      >
        {appliance?.switchName}
      </TableCell>
      <TableCell className="text-lg text-center">
        {onTime?.hours && onTime?.seconds && onTime?.minutes
          ? `${String(onTime?.hours).padStart(2, "0")} hr ${String(
            onTime?.minutes
          ).padStart(2, "0")} min`
          : "--"}
      </TableCell>
      <TableCell className="text-lg text-center">
        {onTime?.hours && onTime?.seconds && onTime?.minutes
          ? `${String(onlineTime?.hours).padStart(2, "0")} hr ${String(
            onlineTime?.minutes
          ).padStart(2, "0")} min`
          : "--"}
      </TableCell>
      <TableCell className="text-lg text-center">
        {analysisData?.controlLogs?.length || "-"}
      </TableCell>
      <TableCell className="text-lg text-center">
        {smartCommands || "-"}
      </TableCell>
      <TableCell className="font-bold text-center">
        {switchCommands || "-"}
      </TableCell>
      <TableCell className="cursor-pointer text-lg">
        {appliance?.switchState === "0" ? (
          <div
            className="p-1 bg-red-500/10 flex items-center justify-center rounded-md px-4 text-red-500 w-20"
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
          <div className=" flex items-center justify-center rounded-md px-4 text-green-500">
            Online
          </div>
        ) : (
          <div className="p-2 flex items-center justify-center rounded-md px-4 text-red-500">
            Offline
          </div>
        )}
      </TableCell>

      {/* Offline Since */}
      <TableCell>
        {deviceConnected ? (
          <div className="text-green-500">-</div>
        ) : (
          <div className="text-red-500">
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
  console.log("here", deviceId);
  useEffect(() => {
    const getOfflineSince = async () => {
      setLoading(true);
      const resp = await fetchDeviceDetails({ deviceId });
      setLoading(false);
      console.log("response", resp);
      if (!resp.success || !resp?.data?.device?.disconnectedAt) {
        setDate("");
      }

      setDate(resp.data.device.disconnectedAt);
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
