import { TableCell } from "@/components/ui/table";
import React, { useEffect, useState } from "react";

export default function Commands({ analysisData }) {
  const [smartCommands, setSmartCommands] = useState(0);
  const [switchCommands, setSwitchCommands] = useState(0);

  console.log("analysisData", analysisData);
  function calculateCommands() {
    let smartCommands = 0;
    let switchCommands = 0;
    for (const device of analysisData) {
      for (const s of device) {
        switchCommands += s?.toggles?.switch || 0;
        smartCommands += s?.toggles?.aliste || 0;
      }
    }

    setSmartCommands(smartCommands);
    setSwitchCommands(switchCommands);
  }

  useEffect(() => {
    if (analysisData?.length === 0 || !analysisData) return;

    function calculateCommands() {
      let totalSmartCommands = 0;
      let totalSwitchCommands = 0;

      for (const device of analysisData) {
        console.log("DEVICE", device);
        if (device.applianceType === 7) continue;
        if (device) {
          const switchCommands = device?.controlLogs.filter(
            (cmd) => cmd?.controllerType === "switch"
          ).length;
          const smartCommands = device?.controlLogs.filter(
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
      <TableCell>{smartCommands + switchCommands}</TableCell>
      <TableCell>{smartCommands}</TableCell>
      <TableCell>{switchCommands}</TableCell>
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
