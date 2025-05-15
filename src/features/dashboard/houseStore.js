import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useHouseStore = create(
  persist(
    (set) => ({
      house: {}, // Initial state
      updateHouse: (house) => set({ house }),
      updateState: (deviceId, switchId, state) => {
        console.log("DATA", deviceId, switchId, state);
        set(({ house }) => {
          // let updatedHouse = { ...house };
          const updatedHouse = {
            ...house,
            rooms: house.rooms.map((room) => ({
              ...room,
              devices: room.devices.map((device) => {
                if (device.deviceId !== deviceId) return device;
                return {
                  ...device,
                  switches: device.switches.map((s) =>
                    s.switchId === switchId ? { ...s, switchState: state } : s
                  ),
                };
              }),
            })),
          };

          // updatedHouse = {
          //   ...updatedHouse,
          //   rooms: updatedHouse.rooms.map((r) => ({
          //     ...r,
          //     devices: r.devices.map((d) => ({
          //       ...d,
          //       switches: d.switches.map((s) => {
          //         if (s.switchId === switchId && d.deviceId === deviceId) {
          //           return {
          //             ...s,
          //             switchState: state,
          //           };
          //         }
          //         return s;
          //       }),
          //     })),
          //   })),
          // };

          // console.info("HOUSE", house?.rooms);
          // console.info("UPDATDHOUSE", updatedHouse?.rooms);

          // for (let room of house.rooms) {
          //   for (let device of room?.devices) {
          //     if (device.deviceId === deviceId) {
          //       updatedSwitches = device.switches.map((s) =>
          //         s.switchId === switchId
          //           ? { ...s, switchState: String(state) }
          //           : s
          //       );

          //       for (let s of device.switches) {
          //         if (s.switchId === switchId) {
          //           s.switchState = String(state);
          //         }
          //       }
          //     }
          //   }
          // }

          return updatedHouse;
        });
      },
    }),
    {
      name: "house-storage", // Name of the storage item
      storage: createJSONStorage(() => localStorage), // Using localStorage
    }
  )
);

export default useHouseStore;
