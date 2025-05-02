"use client";

import React from "react";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuBurger } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";

const navItems = [
  {
    name: "Beranda",
    path: "/beranda",
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
    path: "/manajemen-pengguna",
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
        nama: "Hak Akses",
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
        path: "/akun/logout",
      },
    ],
  },
];

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuBurger className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-start max-h-screen overflow-y-auto p-4">
        {/* logo */}
        <div className="mb-4 text-center w-full">
          <Link href="/">
            <h1 className="text-3xl font-semibold text-accent">SIPP Karhutla</h1>
          </Link>
        </div>

        {/* nav */}
        <nav className="w-full text-accent">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link
                href={item.path || "#"}
                className={`w-full block py-2 ${
                  pathname === item.path
                    ? "text-accent border-b-2 border-accent"
                    : "text-base capitalize hover:text-accent transition-all"
                } flex items-center gap-2`}
              >
                {item.name || "Unnamed"}
                {item.children && (
                  <span className="ml-1">
                    <FiChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                  </span>
                )}
              </Link>

              {/* submenu */}
              {item.children && Array.isArray(item.children) && (
                <div className="pl-6 mt-2 space-y-2 group-hover:block hidden">
                  {item.children.map((subItem, subIndex) => (
                    <Link
                      href={subItem.path || "#"}
                      key={subIndex}
                      className={`block px-4 py-2 hover:text-white hover:bg-[#00CCFF] text-accent rounded-md ${
                        pathname === subItem.path
                          ? "text-white font-md"
                          : "text-accent"
                      }`}
                    >
                      {subItem.name || "Unnamed Subitem"}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
