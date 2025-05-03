"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useAuthStore } from "@/lib/store/authStore";

const navItems = [
  {
    name: "Beranda",
    path: "/",
  },
  {
    name: "Pelaporan",
    path: "/pelaporan",
    children: [
      {
        name: "Patroli Harian",
        path: "/pelaporan/patroli-harian",
      },
      {
        name: "Laporan Patroli",
        path: "/pelaporan/laporan-patroli"
      },
    ],
  },
  {
    name: "Manajemen Pengguna",
    children: [
      {
        name: "Penugasan",
        path: "/manajemen-pengguna/penugasan",
      },
      {
        name: "Personil Patroli",
        path: "/manajemen-pengguna/personil-patroli",
      },
      {
        name: "Wilayah",
        path: "/manajemen-pengguna/wilayah",
      },
      {
        name: "Hak Akses",
        path: "/manajemen-pengguna/hak-akses",
      },
    ],
  },
  {
    name: "Hotspot",
    path: "/hotspot",
  },
  {
    name: "Analisis",
    path: "/analisis",
  },
  {
    name: "Tentang Sistem",
    path: "/tentang-sistem",
  },
  {
    name: "FAQ",
    path: "/faq",
  },
  {
    name: "Akun",
    path: "/akun",
    children: [
      {
        name: "Profile",
        path: "/akun/profile",
      },
      {
        name: "Logout",
        path: "#", 
        action: "logout", 
      },
    ],
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex gap-8">
        {navItems.map((item, index) => {
          const itemClasses = pathname === item.path ? "text-[#09122C] font-md" : "text-accent";
          return (
            <div key={index} className="relative group">
              <div
                className={`flex items-center gap-2 cursor-pointer hover:text-white ${itemClasses}`}
                onClick={() => item.children && toggleDropdown(index)}
              >
                <button>{item.name}</button>
                {item.children && (
                  <span className="ml-1">
                    {openDropdown === index ? (
                      <FiChevronUp className="w-4 h-4 transition-transform" />
                    ) : (
                      <FiChevronDown className="w-4 h-4 transition-transform" />
                    )}
                  </span>
                )}
              </div>

              {/* Submenu */}
              {item.children && openDropdown === index && (
                <div className="absolute top-full left-0 bg-white shadow-xl mt-2 rounded-lg w-auto min-w-max max-h-60 overflow-visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  {item.children.map((subItem, subIndex) => {
                    const subItemClasses = pathname === subItem.path ? "bg-[#00CCFF] text-white font-md" : "text-accent";

                    return subItem.action === "logout" ? (
                      // Trigger modal saat klik Logout
                      <button
                        key={subIndex}
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="block w-full text-left px-4 py-2 hover:text-white hover:bg-[#0099CC] text-accent rounded-md transition-all"
                      >
                        {subItem.name}
                      </button>
                    ) : (
                      <Link
                        href={subItem.path}
                        key={subIndex}
                        className={`block px-4 py-2 hover:text-white hover:bg-[#0099CC] text-accent rounded-md transition-all ${subItemClasses}`}
                      >
                        {subItem.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Modal Logout */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white shadow-lg rounded-xl p-6 max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Konfirmasi Logout</h2>
            <p className="text-gray-500 mb-6">Apakah Anda yakin ingin keluar?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              >
                Ya, Logout
              </button>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;