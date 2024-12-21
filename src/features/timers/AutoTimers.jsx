import { AutoTimeBox } from "./components/AutoTimeBox";
import { DeviceTypeMap } from "@/constants/config";
import { AddAutoTImer } from "./components/AddAutoTImer";
import useHouseStore from "../dashboard/houseStore";

export function AutoTimers() {
  const houseData = useHouseStore((state) => state.house);
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
    <div className="w-full h-full bg-white p-4 overflow-scroll">
      <AddAutoTImer houseData={houseData} />
      {houseData &&
        houseData?.rooms?.map((room) => {
          const autoTimersCount = timerCounter(room);
          if (autoTimersCount === 0) return;
          return (
            <div className="mb-8" key={room.roomName}>
              <h4 className="text-xl text-muted-foreground font-semibold mb-2">
                {room.roomName} ({autoTimersCount})
              </h4>
              <div className="flex flex-wrap gap-4 items-center">
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
            </div>
          );
        })}
    </div>
  );
}
