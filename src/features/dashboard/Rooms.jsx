import { DeviceDetails } from "./device-details";

export default function Rooms({
  roomsData,
  connectedDevices,
  date,
  reload,
  houseId,
}) {
  console.log("RoomsData", roomsData);
  const sorted = (arr) =>
    arr.sort((a, b) => {
      if (a?.devices?.length === 0 && b?.devices?.length > 0) return 1;

      if (b?.devices?.length === 0 && a?.devices?.length > 0) return -1;

      if (a?.devices?.length === 0 && b?.devices?.length === 0) return 0;

      return a.roomName.localeCompare(b.roomName, undefined, {
        sensitivity: "base",
      });
    });
  return (
    <>
      {sorted(roomsData)?.map((room, sno) => (
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
