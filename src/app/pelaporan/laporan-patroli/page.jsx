import Laporan from '@/components/card/Laporan'
// import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import React from 'react'


export default function page() {
  return (
    <main>
      <Header />
      <h1 className='mt-10 text-accent text-4xl font-semibold text-center'>Laporan Patroli</h1>
      <div className='mt-10'>
        <Laporan />
      </div>

      {/* <Footer /> */}
    </main>
  )
}
