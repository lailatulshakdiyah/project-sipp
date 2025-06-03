import Profile from '@/components/card/Profile'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import UserBg from '@/assets/img/user-bg.jpg'
import Image from 'next/image'
import React from 'react'

export default function Page() {
    return (
      <main className="min-h-screen flex flex-col">
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
          <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center'>
            <h1 
              className="absolute top-[15%] left-1/2 transform -translate-x-1/2 -translate-y-[50%] text-white  text-4xl font-bold shadow-xl z-10"
              style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.7)" }}>Data Pengguna</h1>
          </div>
        </div>

        <div className='relative flex justify-center items-center -mt-80 px-4 mb-5'>
          <div className='max-w-3xl w-full mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 border border-gray-200'>
            <Profile />
          </div>
        </div>

        <Footer />
      </main>
    );
}