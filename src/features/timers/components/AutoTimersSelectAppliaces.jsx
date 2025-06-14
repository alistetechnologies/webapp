import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export function AutoTimersSelectAppliances({ data, state, updateState }) {
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
          turnOnAfter: 0,
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

  const disabled = Boolean(
    data?.autoTurnOff ||
      data?.autoTimers?.turnOnAfter ||
      data?.autoTimers?.turnOffAfter
  );

  return (
    <TableRow>
      <TableCell
        className={cn(
          "w-auto",
          disabled && "text-muted-foreground text-opacity-50"
        )}
      >
        {data.switchName}
      </TableCell>

      <TableCell>
        <span className="text-muted-foreground">
          {data?.autoTurnOff
            ? "AutoCut Enabled"
            : data?.autoTimers?.turnOnAfter || data?.autoTimers?.turnOffAfter
            ? "AutoTimers already set"
            : ""}
        </span>
      </TableCell>
      {/* Checkbox */}
      <TableCell className="w-auto">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isDataInState !== undefined}
            onChange={handleCheckboxChange}
            disabled={disabled}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
