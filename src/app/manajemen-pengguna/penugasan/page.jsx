import PatroliTable2 from '@/components/card/PatrolTable2'
// import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import React from 'react'


export default function page() {
  return (
    <main>
      <Header/>
      <h1 className='text-4xl font-semibold text-accent text-center mt-10'>Daftar Surat Tugas</h1>

      <div>
        <PatroliTable2 />
      </div>

      {/* <Footer/> */}
    </main>
  )
}
