import PatrolHotspot from '@/components/card/PatrolHot'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Map from '@/components/map/Map'
import React from 'react'

export default function page() {
  return (
    <main className="relative">
      <Header />

      <div className="h-screen w-full relative z-0">
        {/* Map */}
        <Map />
      </div>

      <div className="mb-12 -mt-80">
          <PatrolHotspot />
      </div>
      <Footer />
    </main>
  )
}