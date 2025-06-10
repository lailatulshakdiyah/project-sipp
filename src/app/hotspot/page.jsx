"use client"

import PatrolHotspot from '@/components/card/PatrolHot'
// import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import MapHots from '@/components/map/MapHots'
import React, { useEffect, useState } from 'react'

export default function page() {
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    const fetchHotspotData = async () => {
      try{
        const res = await fetch("https://fwd.agricodex.id/hotspot.php");
        const data = await res.json();
        console.log("Semua data hotspot:", data);
        setHotspots(data);
      } catch (err) {
        console.error("Gagal mengambil data hotspot:", err);
      }
    };

    fetchHotspotData();
  }, []);

  return (
    <main className="relative">
      <Header />

      <div className="h-screen w-full relative z-0">
        {/* Map */}
        <MapHots hotspots={hotspots} />
      </div>

      <div className="mb-12 -mt-80">
          <PatrolHotspot hotspots={hotspots} />
      </div>
      {/* <Footer /> */}
    </main>
  )
}