import React from 'react'
import Map from '@/components/map/Map'
import Image from 'next/image'
import favicon from '@/assets/img/sipp-favicon.png'
import PatrolStat from '@/components/card/PatrolStat'
import Footer from '@/components/footer/Footer'
import HeaderLog from '@/components/header/HeaderLog'



const DEFAULT_CENTER = [-6.208763, 106.845599]

export default function homepage () {
  return (
    <div>
      <HeaderLog />
      <div className='h-screen w-full relative z-0'>
        <Map />
      </div>
      
      <div className='mb-10 -mt-72'>
        <PatrolStat />
      </div>
      <div className='max-w-screen-xl mx-auto flex items-center p-6 py-6 rounded-xl shadow-xl bg-[#FBFBFB]'>
        {/* deskripsion sistem informasi */}
        <div className='flex-1'>
          <h2 className='text-3xl font-semibold text-accent mb-2'>SIPP Karhutla</h2>
          <p className='text-black text-xl text-justify'>
            Sistem Informasi Patroli Pencegahan Kebakaran Hutan dan Lahan merupakan sebuah sistem informasi pengelolaan data patroli  
            pencegahan karhutla yang terdiri dari patroli mandiri, patroli rutin, patroli terpadu, dan pemadaman untuk mendukung 
            pencegahan karhutla yang efektif dan efisien.
          </p>
        </div>

        {/* Logo sistem informasi */}
        <div className='flex-shrink-0 ml-10'>
          <Image
            src={favicon}
            alt='sipp-favicon'
            width={150}
            height={150}
            className='rounded-full'
          />
        </div>
      </div>

      {/* footer */}
      <div className='mt-5'>
        <Footer />
      </div>
    </div>
  )
}

