import React from 'react'
import Image from 'next/image'
import Favipb from '@/assets/img/favicon.png'
import Klhk from '@/assets/img/logo-klhk-terbaru.png'
import Manggala from '@/assets/img/logo-manggala.png'
import Lpdp from '@/assets/img/logo-lpdp.png'
import Itto from '@/assets/img/logo-itto.gif'

export default function Footer() {
  return (
    <footer className="text-accent">
      {/* Logo Section */}
      <div className="max-w-screen-xl mx-auto px-8 flex flex-wrap justify-center items-center gap-4 py-4">
        <Image src={Favipb} alt="Logo Favicon" width={60} height={60} />
        <Image src={Klhk} alt="Logo KLHK" width={60} height={60} />
        <Image src={Manggala} alt="Logo Manggala" width={60} height={60} />
        <Image src={Lpdp} alt="Logo LPDP" width={60} height={60} />
        <Image src={Itto} alt="Logo ITTO" width={60} height={60} />
      </div>

      {/* Teks Section */}
      <div className="w-full bg-[#AFE2F8] py-4 leading-none">
        <p className="text-sm sm:text-base font-semibold text-center m-0 p-0">
          Sistem Informasi Patroli Pencegahan Kebakaran Hutan dan Lahan
        </p>
      </div>
    </footer>
  )
}
