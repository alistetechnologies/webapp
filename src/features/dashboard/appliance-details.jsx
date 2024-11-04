import { convertMilliseconds } from '@/utils/format';
import { Dot } from 'lucide-react';

export function ApplianceDetails({
  appliances,
  analysisData,
  sno,
  connectedDevices,
}) {
  const onTime = convertMilliseconds(analysisData?.ontime);
  const onlineTime = convertMilliseconds(analysisData?.onlineTime);

  const appliance = appliances[analysisData?.deviceId].find(
    (appliance) => appliance.switchId === analysisData?.switchId
  );

  console.log('[appliance]', appliance);

  if (appliance?.deviceType === 7) return;

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
