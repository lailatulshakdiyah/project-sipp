import Wilayah from '@/components/card/Wilayah'
import Header from '@/components/header/Header'
import React from 'react'

export default function page() {
  return (
    <main>
      <Header />
      <h1 className='text-4xl font-semibold text-accent text-center mt-10'>Wilayah Terdaftar</h1>

      {/* wilayah section */}
      <div>
        <Wilayah />
      </div>
    </main>
  )
}
