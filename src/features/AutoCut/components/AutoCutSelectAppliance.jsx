import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import React, { useEffect, useState } from "react";

export function AutoCutSelectAppliance({ data, state, updateState }) {
  // console.log("[Switch Data]", data);
  const [isDataInState, setIsDataInState] = useState(undefined);

  useEffect(() => {
    setIsDataInState(
      state.find(
        (item) =>
          item.deviceId === data.deviceId && item.switchId === data.switchId
      )
    );
  }, [state]);
  // Handle checkbox change (add or remove data from state)
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      updateState([
        ...state,
        {
          deviceId: data.deviceId,
          switchId: data.switchId,
          turnOffAfter: 0,
        },
      ]);
    } else {
      // Remove data from state
      updateState(
        state.filter(
          (item) =>
            !(
              item.deviceId === data.deviceId && item.switchId === data.switchId
            )
        )
      );
    }
  };
  console.log("Data", data);
  const disabled = Boolean(
    data.autoTimers?.turnOffAfter ||
      data.autoTimers?.turnOnAfter ||
      data?.autoTurnOff
  );
  return (
    <TableRow>
      <TableCell className="w-auto text-muted-foreground">
        {data.switchName} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {disabled ? (
          <span className="text-muted-foreground">Auto Timers Enabled</span>
        ) : (
          ""
        )}
      </TableCell>

      {/* Checkbox */}
      <TableCell className="w-auto">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isDataInState !== undefined}
            onChange={handleCheckboxChange}
            disabled={
              data.autoTimers?.turnOffAfter ||
              data.autoTimers?.turnOnAfter ||
              data?.autoTurnOff
            }
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          />
          {/* <label
            htmlFor='terms'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Accept terms and conditions
          </label> */}
        </div>
      </TableCell>
    </TableRow>
  );
}
