import { TableCell, TableRow } from '@/components/ui/table';
import { convertMilliseconds } from '@/utils/format';
import { Dot } from 'lucide-react';

export function ApplianceDetails({
  appliances,
  analysisData,
  sno,
  connectedDevices,
}) {
  console.log('[analysis] ', analysisData);

  const onTime = convertMilliseconds(analysisData?.ontime);
  const onlineTime = convertMilliseconds(analysisData?.onlineTime);

  // console.log('onTime', onTime, onlineTime);

  const appliance = appliances[analysisData?.deviceId].find(
    (appliance) => appliance.switchId === analysisData?.switchId
  );

  console.log('[appliance]', appliance);

  if (appliance?.deviceType === 7 || !appliance) return;

  return (
    <TableRow className=''>
      <TableCell>{sno}</TableCell>
      <TableCell className='text-lg text-black hover:underline'>
        {appliance?.switchName}
      </TableCell>
      <TableCell className='text-lg text-center'>
        {onTime?.hours && onTime?.seconds && onTime?.minutes
          ? `${String(onTime?.hours).padStart(2, '0')} hr ${String(
              onTime?.minutes
            ).padStart(2, '0')} min`
          : '--'}
      </TableCell>
      <TableCell className='text-lg text-center'>
        {onTime?.hours && onTime?.seconds && onTime?.minutes
          ? `${String(onlineTime?.hours).padStart(2, '0')} hr ${String(
              onlineTime?.minutes
            ).padStart(2, '0')} min`
          : '--'}
      </TableCell>
      <TableCell className='text-lg text-center'>
        {analysisData?.toggles?.aliste + analysisData?.toggles?.switch || '-'}
      </TableCell>
      <TableCell className='text-lg text-center'>
        {analysisData?.toggles?.aliste || '-'}
      </TableCell>
      <TableCell className='font-bold text-center'>
        {analysisData?.toggles?.switch || '-'}
      </TableCell>
      <TableCell className='cursor-pointer text-lg'>
        {appliance?.switchState === '0' ? (
          <div className='p-1 bg-red-500/10 flex items-center justify-center rounded-md px-4 text-red-500 w-20'>
            <Dot className='' /> Off
          </div>
        ) : (
          <div className='p-1 bg-green-500/10 flex items-center justify-center rounded-md text-green-500 w-20'>
            <Dot /> On
          </div>
        )}
      </TableCell>

      <TableCell className='cursor-pointer text-lg font-semibold'>
        {connectedDevices.some((d) => d.deviceId === analysisData?.deviceId) ? (
          <div className=' flex items-center justify-center rounded-md px-4 text-green-500'>
            Online
          </div>
        ) : (
          <div className='p-2 flex items-center justify-center rounded-md px-4 text-red-500'>
            Offline
          </div>
        )}
      </TableCell>
    </TableRow>
  );

  return (
    <div className='grid grid-cols-12 border-b border-gray-600/20 rounded-lg'>
      {/* Row 1 */}
      <div className='col-span-1 p-4 flex items-center justify-center'>
        {sno}
      </div>

      <div className='col-span-2 p-4 flex items-center justify-center'>
        {appliance?.switchName}
      </div>

      <div className='col-span-2 p-4 flex items-center justify-center'>
        {`${String(onTime?.hours).padStart(2, '0')} hr ${String(
          onTime?.minutes
        ).padStart(2, '0')} min`}
      </div>

      <div className='col-span-2 p-4 flex items-center justify-center'>
        {`${String(onlineTime?.hours).padStart(2, '0')} hr ${String(
          onlineTime?.minutes
        ).padStart(2, '0')} min`}
      </div>

      <div className='col-span-1 p-4 flex items-center justify-center'>
        {analysisData?.toggles?.aliste + analysisData?.toggles?.switch}
      </div>

      <div className='col-span-1 p-4 flex items-center justify-center'>
        {analysisData?.toggles?.switch}
      </div>

      <div className='col-span-1 p-4 flex items-center justify-center'>
        {analysisData?.toggles?.aliste}
      </div>

      <div className='col-span-1 p-4 flex items-center justify-center'>
        {appliance?.switchState === '0' ? (
          <div className='p-2 bg-red-500/10 flex items-center justify-center rounded-md px-4 text-red-500'>
            <Dot /> Off
          </div>
        ) : (
          <div className='p-2 bg-green-500/10 flex items-center justify-center rounded-md px-4 text-green-500'>
            <Dot /> On
          </div>
        )}
      </div>

      <div className='col-span-1 p-4 flex items-center justify-center'>
        {connectedDevices.some((d) => d.deviceId === analysisData?.deviceId) ? (
          <div className='p-2  flex items-center justify-center rounded-md px-4 text-green-500'>
            Online
          </div>
        ) : (
          <div className='p-2 flex items-center justify-center rounded-md px-4 text-red-500'>
            Offline
          </div>
        )}
      </div>
    </div>
  );
}
