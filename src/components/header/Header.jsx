import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import favicon from '@/assets/img/sipp-favicon.png'
import Navbar from './Navbar'
import MobileNav from './MobileNav'


export default function Header() {
  return (
    <header className='fixed top-0 left-0 w-full xl:py-4 text-accent bg-[#AFE2F8] shadow-md z-[50]'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/' className='flex items-center space-x-2'>
           <Image 
               src={favicon}
               alt='sipp-favicon'
               width={40}
               height={40}
            />
            <h1 className='text-2xl font-semibold text-accent'>SIPP Karhutla</h1>
        </Link>

        {/* Desktop Nav */}
        <div className='hidden xl:flex items-center'>
          <Navbar />
        </div>

        {/* Mobile Nav */}
        <div className='xl:hidden'>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}