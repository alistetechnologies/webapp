import { TableCell, TableRow } from "@/components/ui/table";
import { convertMilliseconds } from "@/utils/format";
import { Dot } from "lucide-react";
import { controlDevice } from "./api/device";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { useUser } from "../auth/api/userStore";
import useHouseStore from "./houseStore";

export function ApplianceDetails({
  appliances,
  analysisData,
  sno,
  connectedDevices,
}) {
  const user = useUser((state) => state.user);
  const house = useHouseStore((state) => state.house);
  const updateState = useHouseStore((state) => state.updateState);
  const [state, setState] = useState(false);

  // console.log("Appliances", appliances);
  // console.log("AnalysisData", analysisData);
  const [loading, setLoading] = useState(false);
  const onTime = convertMilliseconds(analysisData?.totalOnTime);
  const onlineTime = convertMilliseconds(analysisData?.onlineTime);

  const appliance = appliances[analysisData?.deviceId].find(
    (appliance) => String(appliance.switchId) === String(analysisData?.switchId)
  );
  if (appliance?.deviceType === 7 || !appliance) return;

  const switchCommands = analysisData?.controlLogs.filter(
    (cmd) => cmd?.controllerType === "switch"
  ).length;
  const smartCommands = analysisData?.controlLogs.filter(
    (cmd) => cmd?.controllerType !== "switch"
  ).length;
  console.debug("house", house);
  const toggleApplianceState = async () => {
    setLoading(true);
    const command = String(appliance.switchState) === "0" ? "100" : "0";
    const resp = await controlDevice({
      command,
      deviceId: appliance.deviceId,
      switchId: appliance.switchId,
      controllerId: user.email,
    });

    updateState(appliance.deviceId, appliance.switchId, command);
    setState(!state);
    // console.log("control response", resp);
    setLoading(false);

    // if (!resp.success) {
    //   toast.error(resp.message);
    // }
  };
  return (
    <TableRow className="">
      <TableCell>{sno}</TableCell>
      <TableCell className="text-lg text-black hover:underline">
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
      <TableCell
        className="cursor-pointer text-lg"
        onClick={toggleApplianceState}
      >
        {appliance?.switchState === "0" ? (
          <div className="p-1 bg-red-500/10 flex items-center justify-center rounded-md px-4 text-red-500 w-20">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Dot /> Off{" "}
              </>
            )}
          </div>
        ) : (
          <div className="p-1 bg-green-500/10 flex items-center justify-center rounded-md text-green-500 w-20">
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
        {connectedDevices.some((d) => d.deviceId === analysisData?.deviceId) ? (
          <div className=" flex items-center justify-center rounded-md px-4 text-green-500">
            Online
          </div>
        ) : (
          <div className="p-2 flex items-center justify-center rounded-md px-4 text-red-500">
            Offline
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
