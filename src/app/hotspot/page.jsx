"use client";

import dynamic from "next/dynamic";
import Header from "@/components/header/Header";
import React, { useEffect, useState } from "react";

const MapHots = dynamic(() => import("@/components/map/MapHots"), {
  ssr: false,
});
const PatrolHotspot = dynamic(() => import("@/components/card/PatrolHot"), {
  ssr: false,
});

export default function HotspotPage() {
  const [hotspots, setHotspots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHotspotData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://fwd.agricodex.id/hotspot.php");
        const data = await res.json();
        console.log("Semua data hotspot:", data);
        setHotspots(data);
      } catch (err) {
        console.error("Gagal mengambil data hotspot:", err);
      } finally {
        setIsLoading(false);
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
    </main>
  );
}
