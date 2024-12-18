import { Switch } from '@/components/ui/switch';
import { TableCell, TableRow } from '@/components/ui/table';
import { Checkbox } from '@radix-ui/react-checkbox';
import React, { useState } from 'react';

export function SelectAppliance({ data, state, updateState }) {
  const [isOn, setIsOn] = useState(false);

  // Handle checkbox change (add or remove data from state)
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      updateState([
        ...state,
        {
          action: 'Sync/SetSwitchPins',
          payload: {
            deviceId: data.deviceId,
            state: isOn ? 100 : 0,
            controllerType: 'centralSchedule',
            controllerId: 'centralSchedule',
            control: true,
          },
        },
      ]);
    } else {
      // Remove data from state
      updateState(
        state.filter((item) => item.payload.deviceId !== data.deviceId)
      );
    }
  };

  // Handle switch toggle
  const handleSwitchToggle = () => {
    setIsOn((prev) => {
      const newIsOn = !prev;

      const newState = state.map((item) =>
        item.payload.deviceId === data.deviceId
          ? {
              ...item,
              payload: {
                deviceId: data.deviceId,
                state: newIsOn ? 100 : 0,
                controllerType: 'centralSchedule',
                controllerId: 'centralSchedule',
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
      <TableCell className='w-auto'>{data.switchName}</TableCell>

      {/* Switch */}
      <TableCell className='w-auto'>
        <div className='flex items-center space-x-2'>
          <label className='text-sm'> {isOn ? 'On' : 'Off'}</label>
          <Switch checked={isOn} onCheckedChange={handleSwitchToggle} />
        </div>
      </TableCell>

      {/* Checkbox */}
      <TableCell className='w-auto'>
        <div className='flex items-center space-x-2'>
          <Checkbox
            onCheckedChange={handleCheckboxChange}
            // id={`checkbox-${data}`}
          />
          <label>Add to state</label>
        </div>
      </TableCell>
    </TableRow>
  );
}
