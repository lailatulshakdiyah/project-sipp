import React from 'react'
import Image from 'next/image'
import Favipb from '@/assets/img/favicon.png'
import Klhk from '@/assets/img/logo-klhk-terbaru.png'
import Manggala from '@/assets/img/logo-manggala.png'
import Lpdp from '@/assets/img/logo-lpdp.png'
import Itto from '@/assets/img/logo-itto.gif'

export default function Footer() {
    return (
      <footer className="xl:py-6 text-accent">
        <div className="max-w-screen-xl mx-auto px-8">
          {/* Logo Section */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
            <Image 
              src={Favipb} 
              alt="Logo Favicon" 
              width={60} 
              height={60} 
            />
            <Image 
              src={Klhk} 
              alt="Logo KLHK" 
              width={60} 
              height={60} 
            />
            <Image 
              src={Manggala} 
              alt="Logo Manggala" 
              width={60} 
              height={60} 
            />
            <Image 
              src={Lpdp} 
              alt="Logo LPDP" 
              width={60} 
              height={60} 
            />
            <Image 
              src={Itto} 
              alt="Logo ITTO" 
              width={60} 
              height={60} 
            />
          </div>
        </div>
        {/* Teks Section */}
        <div className="max-w-screen bg-[#AFE2F8] text-center py-5">
          <p className="text-sm sm:text-base font-semibold">    
            Sistem Informasi Patroli Pencegahan Kebakaran Hutan dan Lahan
          </p>
        </div>
      </footer>
    );
  }
  
