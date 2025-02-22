import { DeviceTypeMap } from "@/constants/config";

import useHouseStore from "../dashboard/houseStore";
import { AutoCutBox } from "./components/AutoCutBox";
import { AddAutoCut } from "./components/AddAutoCut";

export function AutoCuts() {
  const houseData = useHouseStore((state) => state.house);
  const countAutoCut = (room) => {
    let count = 0;

    for (let d of room.devices) {
      for (let s of d.switches) {
        if (s.deviceType !== DeviceTypeMap.NA && s.autoTurnOff) {
          count += 1;
        }
      }
    }
    return count;
  };
  return (
    <div className="w-full h-full bg-white p-4 overflow-scroll">
      <AddAutoCut />
      {houseData &&
        houseData?.rooms?.map((room) => {
          const autoCutCount = countAutoCut(room);
          if (autoCutCount === 0) return;
          return (
            <div className="mb-8" key={room.roomName}>
              <h4 className="text-xl text-muted-foreground font-semibold mb-2">
                {room.roomName} ({autoCutCount})
              </h4>
              <div className="flex flex-wrap gap-4 items-center">
                {room?.devices?.map((device) => {
                  return device?.switches?.map((s) => {
                    console.log("S", s);
                    if (s.autoTurnOff) {
                      return (
                        <AutoCutBox
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
