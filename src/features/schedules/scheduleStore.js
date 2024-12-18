import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Creating the Zustand store for schedules
const useScheduleStore = create(
  persist(
    (set) => ({
      schedules: [], // Initial state for schedules (empty array)
      updateSchedules: (schedules) => set(schedules),
      // addSchedule: (schedule) => set((state) => ({
      //   schedules: [...state.schedules, schedule], // Add a new schedule to the list
      // })),
      // removeSchedule: (scheduleId) => set((state) => ({
      //   schedules: state.schedules.filter(schedule => schedule.id !== scheduleId), // Remove a schedule by its id
      // })),
      // updateSchedule: (updatedSchedule) => set((state) => ({
      //   schedules: state.schedules.map(schedule =>
      //     schedule.id === updatedSchedule.id ? updatedSchedule : schedule
      //   ), // Update a schedule by its id
      // })),
    }),
    {
      name: 'schedule-storage', // Name of the storage item in localStorage
      storage: createJSONStorage(() => localStorage), // Using localStorage for persistence
    }
  )
);

export default useScheduleStore;
