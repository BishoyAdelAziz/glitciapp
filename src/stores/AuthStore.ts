import { create } from "zustand";
import Cookies from "js-cookie";

type Roles = "admin" | "manager" | "employee";

interface User {
  id: string;
  name: string;
  email: string;
  role: Roles;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthState {
  user: User;
  setEmail: (email: string) => void;
  setUser: (user: User) => void;
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const initialUser: User = {
  id: "",
  name: "",
  email: "",
  role: "employee",
  createdAt: new Date(0),
  updatedAt: new Date(0),
};

const authStore = create<AuthState>((set) => ({
  user: initialUser,
  setEmail: (email) => set((state) => ({ user: { ...state.user, email } })),
  setUser: (user) => set(() => ({ user })),
  token: null,
  setToken: (token) => {
    Cookies.set("glitciAuthToken", token, {
      expires: 7,
      sameSite: "lax",
      path: "/",
    });
    set({ token });
  },
  clearToken: () => {
    Cookies.remove("glitciAuthToken");
    set({ token: null });
  },
}));

export default authStore;
