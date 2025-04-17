import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type UserRole = 'admin' | 'user';

type UserLogin = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
};

type UserState = {
  user: UserLogin | null;
  login: (user: UserLogin) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        login: (user: UserLogin) => set(() => ({ user: user })),
        logout: () => {
          set({ user: null });
        },
        isAuthenticated: () => get().user !== null,
        isAdmin: () => get().user?.role === 'admin',
      }),
      {
        name: 'user-store',
      }
    )
  )
);
