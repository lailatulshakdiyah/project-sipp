import { useEffect } from "react";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
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
        localStorage.removeItem("authToken");
      },
    }),
    {
      name: "auth-storage", 
      getStorage: () => localStorage, 
    }
  )
);

export const useHydrateAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const token = localStorage.getItem("auth-storage");
    if (token) {
      try {
        const parsed = JSON.parse(token)?.state;
        if (parsed?.token) {
          setAuth(parsed); 
        }
      } catch (e) {
        console.error("Failed to parse auth-storage:", e);
      }
    }
  }, []);
};