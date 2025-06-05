import { create } from "zustand";
import { persist } from "zustand/middleware";
import { usersTable } from "../../data/users";

export type User = {
  id: string;
  email: string;
  password: string;
};

export type UserStore = {
  users: User[];
  currentUser: User | null;
  getUsers: () => User[];
  loginUser: (email: string, password: string) => boolean;
  logoutUser: () => void;
  registerUser: (email: string, password: string) => boolean;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: usersTable,
      currentUser: null,
      getUsers: () => get().users,
      loginUser: (email, password) => {
        const user = get().users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          set({ currentUser: user });
          return true;
        }
        return false;
      },
      logoutUser: () => set({ currentUser: null }),
      registerUser: (email, password) => {
        const existing = get().users.find((u) => u.email === email);
        if (existing) return false;

        const newUser: User = {
          id: Date.now().toString(),
          email,
          password,
        };

        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
        }));

        return true;
      },
    }),
    {
      name: "user-store",
    }
  )
);
