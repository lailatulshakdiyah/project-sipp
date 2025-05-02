"use client";

import Header from "@/components/header/Header";
import React from "react";
import Image from "next/image";
import UserBg from "@/assets/img/user-bg.jpg";
import Footer from "@/components/footer/Footer";

export default function page() {
  return (
    <main>
      <Header />
      <div className="relative w-full h-[75vh]">
        <Image
          src={UserBg}
          alt="User bg"
          width={1500}
          height={1200}
          quality={100}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-white font-bold shadow-none drop-shadow-xl mb-5"
            style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.7)" }}
          >
            Apa itu SIPP Karhutla
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-white mt-2 max-w-[800px] leading-relaxed">
            Sistem Informasi Patroli Pencegahan Kebakaran Hutan dan Lahan (SIPP Karhutla) 
            merupakan alat bantu dalam kegiatan patroli pencegahan karhutla di Indonesia
          </h2>
        </div>
      </div>

      {/* Container Section */}
      <div className="relative max-w-5xl mx-auto px-6 py-10 bg-white shadow-xl rounded-xl -mt-24">
        <h3 className="text-2xl font-bold text-accent mb-4">
          Fungsi Utama SIPP Karhutla:
        </h3>
        <ul className="list-decimal list-inside text-lg text-gray-700 space-y-2">
          <li>Pengelolaan data pengguna aplikasi mobile patroli pencegahan karhutla</li>
          <li>Monitoring dan analisis data patroli pencegahan karhutla</li>
        </ul>
      </div>

      <p className="max-w-5xl mx-auto mt-10 text-lg text-accent text-justify leading-relaxed px-6">
        SIPP Karhutla dibangun oleh Departemen Ilmu Komputer, Fakultas Matematika dan Ilmu Pengetahuan Alam,
        Institut Pertanian Bogor (IPB) bekerja sama dengan Balai Pengendalian Perubahan Iklim dan Kebakaran Hutan dan Lahan (PPIKHLK)
        Wilayah Sumatera dan Kalimantan, Direktorat Jenderal Pengendalian Perubahan Iklim, Kementerian Lingkungan Hidup dan Kehutana (KLHK), 
        dan Direktorat Pengendalian Kebakaran Hutan dan Lahan KHLK.
      </p>
      <p className="max-w-5xl mx-auto mt-7 text-lg text-accent text-justify leading-relaxed px-6">
        Pembangunan dan penerapan SIPP Karhutla di Wilayah Sumatera didanai oleh Lembaga Pengelola Dana Pendidikan (LPDP), Kementerian Keuangan 
        Republik Indonesia. Sedangkan pengembangan dan penerapan SIPP Karhutla di Kalimantan serta pengadaan infrastruktur di KLHK didanai oleh 
        International Tropical Timber Organization (ITTO).
      </p>
      <p className="max-w-5xl mx-auto mt-7 text-lg text-accent text-justify leading-relaxed px-6">
        Penggunaan SIPP Karhutla diatur oleh Peraturan Direktur Jenderal Pengendalian Peubahan Iklim No. P.10/PPI/SET/KUM.1/12/2020 
        tentang Tata Cara Penggunaan Sistem Informasi Patroli Pencegahan Kebakaran Hutan dan Lahan (SIPP Karhutla) sebagai acuan dalam 
        pencegahan kebakaran hutan dan lahan.
      </p>

      {/* Kontak Section */}
      <div className="max-w-5xl mx-auto px-6 py-6 mt-6">
        <h3 className="text-xl font-bold text-accent">Kontak</h3>
        <p className="text-lg text-accent leading-relaxed mb-5">
          Departemen Ilmu Komputer, FMIPA IPB <br />
          Jl. Meranti Wing 20 Level V, Bogor, Indonesia 16680 <br />
          <span className="font-semibold">E-mail:</span> karhutla.ipb@apps.ipb.ac.id <br />
          <span className="font-semibold">Telp./Fax:</span> 0251-8625584
        </p>
      </div>

      <Footer/>
    </main>
  );
}
