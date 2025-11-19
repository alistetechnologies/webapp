import { TableCell } from "@/components/ui/table";
import { octiotFont } from "@/constants/config";
import { isOctiot } from "@/utils/browser";
import React, { useEffect, useState } from "react";

export default function Commands({ analysisData, logsDate }) {
  const [smartCommands, setSmartCommands] = useState(0);
  const [switchCommands, setSwitchCommands] = useState(0);

  useEffect(() => {
    if (analysisData?.length === 0 || !analysisData) return;

    function calculateCommands() {
      let totalSmartCommands = 0;
      let totalSwitchCommands = 0;

      for (const device of analysisData) {
        const controlLogs = (device?.controlLogs || []).filter((log) => {
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
        if (device.applianceType === 7) continue;
        if (device) {
          const switchCommands = controlLogs.filter(
            (cmd) => cmd?.controllerType === "switch"
          ).length;
          const smartCommands = controlLogs.filter(
            (cmd) => cmd?.controllerType !== "switch"
          ).length;

          totalSmartCommands += smartCommands;
          totalSwitchCommands += switchCommands;
        }
      }

      setSmartCommands(totalSmartCommands);
      setSwitchCommands(totalSwitchCommands);
    }
    calculateCommands();
  }, [analysisData]);
  return (
    <>
      <TableCell
        style={{
          ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
        }}
      >
        {smartCommands + switchCommands}
      </TableCell>
      <TableCell
        style={{
          ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
        }}
      >
        {smartCommands}
      </TableCell>
      <TableCell
        style={{
          ...(isOctiot ? { fontSize: octiotFont.subHeaderFontSize } : {}),
        }}
      >
        {switchCommands}
      </TableCell>
    </>
  );
  return (
    <>
      <div className="col-span-2 p-4 flex items-center justify-center">
        <span className="text-xl font-bold">{smartCommands}/</span>
        <span className="text-sm">{smartCommands + switchCommands}</span>
      </div>

      <div className="col-span-2 p-4 flex items-center justify-center">
        <span className="text-xl font-bold">{switchCommands}/</span>
        <span className="text-sm">{smartCommands + switchCommands}</span>
      </div>
    </>
  );
}
