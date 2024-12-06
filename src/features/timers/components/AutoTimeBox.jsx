import { Switch } from '@/components/ui/switch';
import { convertTimeStringTo12Hour } from '@/utils/format';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { setAutoTimers, toggleAutoTimers } from '../api/AutoTimers';

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  return `${h !== 0 ? `${h} hr ` : ''}${m !== 0 ? `${m} min ` : ''} ${
    s !== 0 ? `${s} sec` : ''
  }`;
}

export function AutoTimeBox({ data = {}, deviceId }) {
  const [active, setActive] = useState(data?.autoTImers?.enabled);

  useEffect(() => {
    setActive(data?.autoTimers?.enabled);
  }, [data]);

  async function onToggle(event) {
    let data = {
      deviceId: deviceId,
      switchId: data.switchId,
      enabled: event,
    };
    const resp = await toggleAutoTimers(data);
  }

  async function onDelete() {
    const response = await setAutoTimers([
      {
        deviceId,
        switchId: data.switchId,
        mode: 'Always',
        turnOffAfter: 0,
        turnOnAfter: 0,
        startTime: '',
        stopTime: '',
      },
    ]);
  }

  return (
    <div className='p-4 h-52 w-72 rounded-lg shadow-lg'>
      <div className='flex flex-col justify-between w-full h-full'>
        {/* Device Name and Toggle */}
        <div className='flex justify-between'>
          <p className='font-bold' title={deviceId}>
            {data.switchName}
          </p>
          <Switch checked={active} onCheckedChange={onToggle} />
        </div>

        {/* OnTime & OffTime */}
        <div className='flex justify-between'>
          <div>
            <p className='text-muted-foreground'>On Time</p>
            {formatTime(data?.autoTimers?.turnOffAfter)}
            <p className='font-semibold'></p>
          </div>

          <div>
            <p className='text-muted-foreground'>Off Time</p>
            <p className='font-semibold'>
              {formatTime(data?.autoTimers?.turnOnAfter)}
            </p>
          </div>
        </div>

        <div className='flex justify-between text-sm text-blue-700 font-semibold cursor-pointer hover:underline'>
          <p className='text-sm text-blue-700 font-semibold'>
            Run Time:{' '}
            {data?.autoTimers?.mode === 'Always'
              ? 'Always'
              : `${convertTimeStringTo12Hour(
                  data?.autoTimers?.startTime
                )} to ${convertTimeStringTo12Hour(data?.autoTimers?.stopTime)}`}
          </p>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}
