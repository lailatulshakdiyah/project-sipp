import React from 'react'
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import PatroliTable1 from '@/components/card/PatrolTable1';


export default function Page() {
  return (
    <main>
      <Header/>
      <h1 className='text-4xl font-semibold text-accent text-center mt-10'>Daftar Surat Tugas</h1>
      
      {/* table patroli harian */}
      <div>
        <PatroliTable1/>
      </div>

      <Footer/>
    </main>
  )
}
