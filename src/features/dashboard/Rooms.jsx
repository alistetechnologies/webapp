import { DeviceDetails } from './device-details';

export default function Rooms({
  roomsData,
  connectedDevices,
  date,
  reload,
  houseId,
}) {
  return (
    <>
      {roomsData?.map((room, sno) => (
        <DeviceDetails
          room={room}
          sno={sno + 1}
          key={sno}
          date={date}
          connectedDevices={connectedDevices}
          reload={reload}
          houseId={houseId}
        />
      ))}
    </>
  );
}
