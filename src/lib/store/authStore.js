import { useEffect } from "react";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  detail: null,
  isLoggedIn: false,
  setAuth: (data) => set(data),
  logout: () => {
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    set(() => ({
      token: null,
      user: null,
      detail: null,
      isLoggedIn: false,
    }));
  } 
}));

export const useHydrateAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuth({ user: null, token });
    }
  }, []);
}