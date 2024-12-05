import React from 'react';
import { AutoTimeBox } from './components/AutoTimeBox';
import { CircleArrowOutDownRightIcon } from 'lucide-react';
import { DeviceTypeMap } from '@/constants/config';

export function AutoTimers({ houseData }) {
  console.log('[houseData]', houseData);
  const timerCounter = (room) => {
    let count = 0;
    for (let d of room.devices) {
      for (let s of d.switches) {
        let startTime = s?.autoTimers?.startTime;
        let onTime = s?.autoTimers?.turnOffAfter;

        if (s.deviceType !== DeviceTypeMap.NA && (startTime || onTime)) {
          count += 1;
        }
      }
    }

    return count;
  };
  return (
    <div className='w-full h-full bg-white p-4'>
      {houseData &&
        houseData?.rooms?.map((room) => {
          const autoTimersCount = timerCounter(room);
          if (autoTimersCount === 0) return;
          return (
            <div className='mb-8'>
              <h4 className='text-xl text-muted-foreground font-semibold mb-2'>
                {room.roomName} ({autoTimersCount})
              </h4>
              {room?.devices?.map((device) => {
                return device.switches.map((s) => {
                  let startTime = s?.autoTimers?.startTime;
                  let onTime = s?.autoTimers?.turnOffAfter;
                  if (startTime || onTime) {
                    return (
                      <AutoTimeBox
                        data={s}
                        key={`${device.deviceId}_${s.switchId}`}
                        deviceId={device.deviceId}
                      />
                    );
                  }
                });
              })}
            </div>
          );
        })}
    </div>
  );
}
