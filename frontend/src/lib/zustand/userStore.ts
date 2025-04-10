import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type UserLogin = {
  email: string;
  password: string;
};

type UserState = {
  user: UserLogin | null;
  login: (user: UserLogin) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: () => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        login: (user: UserLogin) => set(() => ({ user: user })),
        logout: () => {
          set({ user: null });
        },
        isAuthenticated: false,
        setIsAuthenticated: () =>
          set((state) => ({ isAuthenticated: !state.isAuthenticated })),
      }),
      {
        name: 'user-store',
      }
    )
  )
);
