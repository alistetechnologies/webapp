import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useHouseStore = create(
  persist(
    (set) => ({
      house: {}, // Initial state
      updateHouse: (house) => set({ house }), // Update function
    }),
    {
      name: 'house-storage', // Name of the storage item
      storage: createJSONStorage(() => localStorage), // Using localStorage
    }
  )
);

export default useHouseStore;
