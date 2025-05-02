import React from 'react'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import Akses from '@/components/card/Akses'

export default function page() {
  return (
    <main>
      <Header />
      <h1 className='text-4xl font-semibold text-accent text-center mt-10'>Manajemen Hak Akses</h1>

      <div>
        <Akses />
      </div>

      <Footer/>
    </main>
  )
}
