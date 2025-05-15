import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Create the store
const useHouseStore = create(
  persist(
    (set) => ({
      house: { update: false }, // Initial state

      // Function to update the house object directly
      updateHouse: (house) => {
        set((state) => ({
          house: { ...house, update: !state.house.update },
        }));
      },

      // Function to update a specific device's switch state
      updateState: (deviceId, switchId, command) => {
        set((state) => {
          const updatedHouse = { ...state.house };

          // Find the device and update the switch state
          updatedHouse.rooms = updatedHouse.rooms.map((room) => {
            room.devices = room.devices.map((device) => {
              if (device.deviceId === deviceId) {
                device.switches = device.switches.map((s) =>
                  s.switchId === switchId ? { ...s, switchState: command } : s
                );
              }
              return device;
            });
            return room;
          });

          return { house: { ...updatedHouse, update: !updatedHouse.update } };
        });
      },
    }),
    {
      name: "house-storage", // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Using localStorage as the storage provider
    }
  )
);

export default useHouseStore;
