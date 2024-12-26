import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";

import { useState, useEffect } from "react";

export function SelectAppliance({ data, state, updateState }) {
  const [isOn, setIsOn] = useState(false);

  // Effect hook to set initial state based on the deviceId and switchId
  useEffect(() => {
    const isDeviceInState = state.find(
      (item) =>
        item.payload.deviceId === data.deviceId &&
        item.payload.switchId === data.switchId
    );
    setIsOn(isDeviceInState ? isDeviceInState.payload.command === 100 : false);
  }, [data.deviceId, data.switchId, state]);

  // Handle checkbox change (add or remove data from state)
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      updateState([
        ...state,
        {
          action: "Sync/Control",
          payload: {
            deviceId: data.deviceId,
            switchId: data.switchId,
            command: isOn ? 100 : 0,
            controllerType: "centralSchedule",
            controllerId: "centralSchedule",
            control: true,
          },
        },
      ]);
    } else {
      // Remove data from state
      updateState(
        state.filter(
          (item) =>
            item.payload.deviceId !== data.deviceId ||
            item.payload.switchId !== data.switchId
        )
      );
    }
  };

  // Handle switch toggle
  const handleSwitchToggle = () => {
    setIsOn((prev) => {
      const newIsOn = !prev;

      const newState = state.map((item) =>
        item.payload.deviceId === data.deviceId &&
        item.payload.switchId === data.switchId
          ? {
              ...item,
              payload: {
                deviceId: data.deviceId,
                switchId: data.switchId,
                command: newIsOn ? 100 : 0,
                controllerType: "centralSchedule",
                controllerId: "centralSchedule",
                control: true,
              },
            }
          : item
      );
      updateState(newState);
      return newIsOn;
    });
  };

  return (
    <TableRow>
      <TableCell className="w-auto">{data.switchName}</TableCell>

      {/* Switch */}
      <TableCell className="w-auto">
        <div className="flex items-center space-x-2">
          <label className="text-sm"> {isOn ? "On" : "Off"}</label>
          <Switch checked={isOn} onCheckedChange={handleSwitchToggle} />
        </div>
      </TableCell>

      {/* Checkbox */}
      <TableCell className="w-auto">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={state.some(
              (item) =>
                item.payload.deviceId === data.deviceId &&
                item.payload.switchId === data.switchId
            )}
            onChange={handleCheckboxChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </TableCell>
      <TableCell className="w-auto">{data.switchName}</TableCell>

      {/* Switch */}
      <TableCell className="w-auto">
        <div className="flex items-center space-x-2">
          <label className="text-sm"> {isOn ? "On" : "Off"}</label>
          <Switch
            checked={isOn}
            onCheckedChange={handleSwitchToggle}
            disabled={
              state.some(
                (item) =>
                  item.payload.deviceId === data.deviceId &&
                  item.payload.switchId === data.switchId
              )
                ? false
                : true
            }
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
