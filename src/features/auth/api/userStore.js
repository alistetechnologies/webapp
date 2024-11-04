import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUser = create(
  persist(
    (set) => ({
      user: null, // Initial state of user
      updateUser: (user) => set({ user }), // Update the user state
      deleteUser: () => set({ user: null }), // Clear user state
    }),
    {
      name: 'user-storage', // Unique name for the storage item
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);
