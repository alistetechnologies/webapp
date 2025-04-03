import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserHousesStore = create(
  persist(
    (set) => ({
      houses: [], // Initial state: an empty array
      updateHouses: (newHouses) => set({ houses: newHouses }), // Function to replace the array
    }),
    {
      name: "houses-storage", // Name of the storage item
      storage: createJSONStorage(() => localStorage), // Using localStorage for persistence
    }
  )
);

export default useUserHousesStore;
