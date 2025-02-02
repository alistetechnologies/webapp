import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useRoomStore = create(
  persist(
    (set) => ({
      room: {}, // Initial state
      updateRoom: (room) => set({ room }), // Update function
    }),
    {
      name: 'room-storage', // Name of the storage item
      storage: createJSONStorage(() => localStorage), // Using localStorage
    }
  )
);

export default useRoomStore;
