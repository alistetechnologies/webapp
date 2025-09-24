import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set, get) => ({
      auth: {
        number: '',
        accessToken: null,
        refreshToken: null,
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
      logout: () => {
        set(() => ({
          auth: { number: '', accessToken: null, refreshToken: null },
        }));
      },
      isLoggedIn: () => {
        const { auth } = get();
        return Boolean(auth?.accessToken);
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
