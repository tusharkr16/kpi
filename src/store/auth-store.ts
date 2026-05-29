import { create } from "zustand";
import type { IUserInfo } from "@/app/auth/types/auth-types";

interface AuthStore {
  user: IUserInfo | null;
  setUser: (user: IUserInfo | null) => void;
  logoutUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logoutUser: () => set({ user: null }),
}));
