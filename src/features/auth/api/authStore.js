import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set) => ({
      auth: {
        number: '',
      },
      addNumber: (number) => {
        set((state) => ({
          auth: {
            ...state.auth,
            number,
          },
        }));
      },
      addTokens: ({ accessToken, refreshToken }) => {
        set((state) => ({
          auth: {
            ...state.auth,
            accessToken,
            refreshToken,
          },
        }));
      },
      delete: () => {
        set(() => ({
          auth: { number: '' },
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
