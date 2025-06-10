import Personil from '@/components/card/Personil'
// import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import React from 'react'

export default function page() {
  return (
    <main>
      <Header/>
      <h1 className='text-4xl font-semibold text-accent text-center mt-10'>Personil Terdaftar</h1>

      {/* section personil table */}
      <div>
        <Personil />
      </div>

      {/* <Footer/> */} 
    </main>
  )
}
