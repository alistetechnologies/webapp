import { TableRow } from '@/components/ui/table';
import { DeviceDetails } from './device-details';

export default function Rooms({ roomsData, connectedDevices, date }) {
  console.log('====================================');
  console.log(roomsData);
  console.log('====================================');
  return (
    <>
      {roomsData?.map((room, sno) => (
        
        <DeviceDetails
          room={room}
          sno={sno + 1}
          key={sno}
          date={date}
          connectedDevices={connectedDevices}
        />
      ))}
    </>
  );
}
