"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import Header from "@/components/header/Header";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    if (typeof window !== "undefined") {   // hapus token dari localStorage dan cookies
      localStorage.removeItem("authToken");
      document.cookie =
        "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    router.replace("/homepage");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Konfirmasi Logout
          </h2>
          <p className="text-gray-500 mb-6">Apakah Anda yakin ingin keluar?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
            >
              Ya, Logout
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
