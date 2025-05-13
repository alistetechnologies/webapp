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
          console.log("HOUSE", house);
          for (let room of house.rooms) {
            for (let device of room?.devices) {
              if (device.deviceId === deviceId) {
                for (let s of device.switches) {
                  if (s.switchId === switchId) {
                    s.switchState = String(state);
                  }
                }
              }
            }
          }
          console.debug("UpdatedHouse", house);
          return house;
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
