import { DeviceDetails } from './device-details';

export default function Rooms({ roomsData, connectedDevices }) {
  return (
    <div>
      {roomsData?.map((room, sno) => (
        <DeviceDetails
          room={room}
          sno={sno + 1}
          connectedDevices={connectedDevices}
          key={sno}
        />
      ))}
    </div>
  );
}
