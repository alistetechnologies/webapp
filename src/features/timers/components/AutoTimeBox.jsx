import { Switch } from '@/components/ui/switch';
import { convertTimeStringTo12Hour } from '@/utils/format';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { setAutoTimers, toggleAutoTimers } from '../api/AutoTimers';
import { UpdateAutoTimer } from './UpdateAutoTimer';
import toast from 'react-hot-toast';

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
    let payload = {
      deviceId: deviceId,
      switchId: data.switchId,
      enabled: event,
    };
    const resp = await toggleAutoTimers(payload);
  }

  async function onDelete() {
    const resp = await setAutoTimers([
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

    if (resp.success) {
      toast.success('Successfully deleted the timer.');
    }
  }

  return (
    <div className='group relative'>
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

              <p className='font-semibold'>
                {formatTime(data?.autoTimers?.turnOffAfter)}
              </p>
            </div>

            <div>
              <p className='text-muted-foreground'>Off Time</p>
              <p className='font-semibold'>
                {formatTime(data?.autoTimers?.turnOnAfter)}
              </p>
            </div>
          </div>

          <UpdateAutoTimer data={data} deviceId={deviceId} />
        </div>
      </div>
      <div
        className='absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-72 text-center text-white rounded cursor-pointer  bg-red-400'
        onClick={onDelete}
      >
        Delete
      </div>
    </div>
  );
}
