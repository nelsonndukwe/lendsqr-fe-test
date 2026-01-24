import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  email: string;
  password: string;
}

interface AuthResponse {
  status: "success" | "error";
  message: string;
  user: User | null;
}

interface Store {
  currentUser: User | null;
  setCurrentUser: (user: User) => Promise<AuthResponse>;
  removeCurrentUser: () => void;
  getCurrentUser: () => User | null;
}

const validUsers: User[] = [{ email: "test@example.com", password: "123456" }];

//Replace with API look up

export const currentUserStore = create<Store>()(
  persist(
    (set, get) => ({
      currentUser: null,

      setCurrentUser: async (user) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const foundUser = validUsers.find((u) => u.email === user.email);

        if (!foundUser) {
          return {
            status: "error",
            message: "User not found",
            user: null,
          };
        }

        if (foundUser.password !== user.password) {
          return {
            status: "error",
            message: "Invalid credentials",
            user: null,
          };
        }

        set({ currentUser: foundUser });

        return {
          status: "success",
          message: "Login successful",
          user: foundUser,
        };
      },

      removeCurrentUser: () => {
        set({ currentUser: null });
      },
      getCurrentUser: () => {
        return get().currentUser;
      },
    }),
    {
      name: "current-user-storage", // localStorage key
      partialize: (state) => ({ currentUser: state.currentUser }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
